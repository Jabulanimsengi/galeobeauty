import { NextResponse } from "next/server";
import { getPostgresPool } from "@/lib/server/postgres";
import { buildPayFastFormData, getPayFastUrl } from "@/lib/server/payfast";
import { checkRateLimitForRequest } from "@/lib/server/rate-limit";
import type { OrderItem, DeliveryMethod, DeliveryAddress } from "@/lib/product-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ============================================
// REQUEST / RESPONSE TYPES
// ============================================

interface CreateOrderRequest {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: DeliveryAddress;
  items: OrderItem[];
  notes?: string;
}

// ============================================
// HELPERS
// ============================================

/** Generate a human-readable order number: GB-YYYYMMDD-XXXX */
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GB-${dateStr}-${random}`;
}

/** Basic delivery fee (flat rate for now). */
function calculateDeliveryFee(method: DeliveryMethod): number {
  if (method === "pickup") return 0;
  return 15000; // R150 flat rate delivery
}

/** Validate phone format */
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("27") && digits.length === 11;
}

/** Split a full name into first and last parts */
function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

// ============================================
// POST — Create Order
// ============================================

export async function POST(request: Request) {
  const rateLimit = checkRateLimitForRequest({
    request,
    namespace: "order-create",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many order attempts. Please wait a few minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  try {
    const body = (await request.json()) as CreateOrderRequest;

    // Validation
    if (!body.customerName?.trim()) {
      return NextResponse.json({ ok: false, error: "Customer name is required." }, { status: 400 });
    }
    if (!body.customerPhone?.trim() || !isValidPhone(body.customerPhone)) {
      return NextResponse.json({ ok: false, error: "A valid SA phone number (+27...) is required." }, { status: 400 });
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ ok: false, error: "At least one item is required." }, { status: 400 });
    }
    if (body.deliveryMethod === "delivery" && !body.deliveryAddress?.street) {
      return NextResponse.json({ ok: false, error: "Delivery address is required for delivery orders." }, { status: 400 });
    }

    // Calculate totals
    const subtotalCents = body.items.reduce(
      (sum, item) => sum + item.priceCents * item.quantity, 0
    );
    const deliveryFeeCents = calculateDeliveryFee(body.deliveryMethod);
    const totalCents = subtotalCents + deliveryFeeCents;
    const itemCount = body.items.reduce((sum, item) => sum + item.quantity, 0);
    const orderNumber = generateOrderNumber();

    // Insert order into DB
    const pool = getPostgresPool();
    const result = await pool.query<{ id: string; created_at: string }>(
      `insert into orders (
        order_number, status, customer_name, customer_email, customer_phone,
        delivery_method, delivery_address, delivery_fee_cents,
        subtotal_cents, total_cents, currency,
        payment_status, items_json, item_count, notes
      ) values (
        $1, 'pending', $2, $3, $4, $5, $6::jsonb, $7, $8, $9, 'ZAR', 'unpaid', $10::jsonb, $11, $12
      ) returning id, created_at`,
      [
        orderNumber,
        body.customerName.trim(),
        body.customerEmail?.trim() || null,
        body.customerPhone.trim(),
        body.deliveryMethod,
        body.deliveryAddress ? JSON.stringify(body.deliveryAddress) : null,
        deliveryFeeCents,
        subtotalCents,
        totalCents,
        JSON.stringify(body.items),
        itemCount,
        body.notes?.trim() || null,
      ]
    );

    const orderId = result.rows[0]?.id;
    if (!orderId) {
      throw new Error("Failed to create order.");
    }

    // Build PayFast payment form data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.galeobeauty.com";
    const { first, last } = splitName(body.customerName);

    const payFastData = buildPayFastFormData({
      orderId: orderNumber,
      amount: (totalCents / 100).toFixed(2),
      itemName: `Galeo Beauty Order (${itemCount} item${itemCount !== 1 ? "s" : ""})`,
      customerName: first,
      customerSurname: last,
      customerEmail: body.customerEmail?.trim(),
      customerPhone: body.customerPhone.replace(/^\+/, ""),
      returnUrl: `${baseUrl}/shop/order-confirmation?order=${orderNumber}`,
      cancelUrl: `${baseUrl}/shop/cart`,
      notifyUrl: `${baseUrl}/api/orders/notify`,
    });

    return NextResponse.json(
      {
        ok: true,
        orderId,
        orderNumber,
        payFastUrl: getPayFastUrl(),
        payFastData,
        totalCents,
      },
      { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Failed to create order:", error);
    const message = error instanceof Error ? error.message : "Unable to create order.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
