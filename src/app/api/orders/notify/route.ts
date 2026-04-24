import { NextResponse } from "next/server";
import { getPostgresPool } from "@/lib/server/postgres";
import {
  validateITNSignature,
  validateITNMerchant,
  type PayFastITNData,
} from "@/lib/server/payfast";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ============================================
// PayFast ITN (Instant Transaction Notification) Handler
// ============================================

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      }
    });

    const itnData = data as unknown as PayFastITNData;

    // Step 1: Validate signature
    if (!validateITNSignature(itnData)) {
      console.error("PayFast ITN: Invalid signature", { orderId: itnData.m_payment_id });
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // Step 2: Validate merchant ID
    if (!validateITNMerchant(itnData)) {
      console.error("PayFast ITN: Merchant ID mismatch", {
        orderId: itnData.m_payment_id,
        received: itnData.merchant_id,
      });
      return new NextResponse("Merchant mismatch", { status: 400 });
    }

    const orderNumber = itnData.m_payment_id;
    const paymentId = itnData.pf_payment_id;
    const paymentStatus = itnData.payment_status;
    const amountGross = itnData.amount_gross;

    console.log("PayFast ITN received:", {
      orderNumber,
      paymentId,
      paymentStatus,
      amountGross,
    });

    const pool = getPostgresPool();

    // Step 3: Check order exists and amounts match
    const orderResult = await pool.query<{
      id: string;
      total_cents: number;
      payment_status: string;
    }>(
      `select id, total_cents, payment_status from orders where order_number = $1 limit 1`,
      [orderNumber]
    );

    const order = orderResult.rows[0];
    if (!order) {
      console.error("PayFast ITN: Order not found", { orderNumber });
      return new NextResponse("Order not found", { status: 404 });
    }

    // Idempotency: if already paid, acknowledge but don't re-process
    if (order.payment_status === "paid") {
      console.log("PayFast ITN: Order already paid, skipping", { orderNumber });
      return new NextResponse("OK", { status: 200 });
    }

    // Validate amount matches
    const expectedAmount = (order.total_cents / 100).toFixed(2);
    if (amountGross !== expectedAmount) {
      console.error("PayFast ITN: Amount mismatch", {
        orderNumber,
        expected: expectedAmount,
        received: amountGross,
      });
      return new NextResponse("Amount mismatch", { status: 400 });
    }

    // Step 4: Update order status based on payment result
    if (paymentStatus === "COMPLETE") {
      await pool.query(
        `update orders set
          status = 'paid',
          payment_status = 'paid',
          payment_method = 'payfast',
          payment_reference = $2,
          paid_at = now()
        where order_number = $1`,
        [orderNumber, paymentId]
      );

      console.log("PayFast ITN: Order paid successfully", { orderNumber, paymentId });

      // TODO: Send WhatsApp notification to salon owner about new order
    } else if (paymentStatus === "CANCELLED") {
      await pool.query(
        `update orders set
          status = 'cancelled',
          payment_status = 'failed',
          payment_reference = $2
        where order_number = $1`,
        [orderNumber, paymentId]
      );

      console.log("PayFast ITN: Payment cancelled", { orderNumber });
    } else {
      console.log("PayFast ITN: Unhandled payment status", {
        orderNumber,
        paymentStatus,
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("PayFast ITN processing failed:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
