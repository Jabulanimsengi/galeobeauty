import "server-only";
import crypto from "crypto";

// ============================================
// PAYFAST CONFIGURATION
// ============================================

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";
const PAYFAST_SANDBOX_VALIDATE_URL = "https://sandbox.payfast.co.za/eng/query/validate";
const PAYFAST_LIVE_VALIDATE_URL = "https://www.payfast.co.za/eng/query/validate";

function isSandbox(): boolean {
  return process.env.NEXT_PUBLIC_PAYFAST_SANDBOX === "true";
}

export function getPayFastUrl(): string {
  return isSandbox() ? PAYFAST_SANDBOX_URL : PAYFAST_LIVE_URL;
}

function getPayFastValidateUrl(): string {
  return isSandbox() ? PAYFAST_SANDBOX_VALIDATE_URL : PAYFAST_LIVE_VALIDATE_URL;
}

function getMerchantId(): string {
  const id = process.env.PAYFAST_MERCHANT_ID?.trim();
  if (!id) throw new Error("PAYFAST_MERCHANT_ID is not configured.");
  return id;
}

function getMerchantKey(): string {
  const key = process.env.PAYFAST_MERCHANT_KEY?.trim();
  if (!key) throw new Error("PAYFAST_MERCHANT_KEY is not configured.");
  return key;
}

function getPassphrase(): string | null {
  return process.env.PAYFAST_PASSPHRASE?.trim() || null;
}

// ============================================
// PAYFAST SIGNATURE GENERATION
// ============================================

export interface PayFastPaymentData {
  /** Unique order reference for m_payment_id */
  orderId: string;
  /** Total amount in ZAR (e.g. "450.00") */
  amount: string;
  /** Product/order description */
  itemName: string;
  /** Customer name */
  customerName: string;
  /** Customer surname */
  customerSurname: string;
  /** Customer email */
  customerEmail?: string;
  /** Customer phone */
  customerPhone?: string;
  /** URL to redirect after successful payment */
  returnUrl: string;
  /** URL to redirect after cancelled payment */
  cancelUrl: string;
  /** URL for PayFast ITN (server-to-server notification) */
  notifyUrl: string;
}

/**
 * Build the complete PayFast form data including the MD5 signature.
 * The form should be auto-submitted to the PayFast URL.
 */
export function buildPayFastFormData(payment: PayFastPaymentData): Record<string, string> {
  const data: Record<string, string> = {};

  // Merchant details
  data["merchant_id"] = getMerchantId();
  data["merchant_key"] = getMerchantKey();

  // URLs
  data["return_url"] = payment.returnUrl;
  data["cancel_url"] = payment.cancelUrl;
  data["notify_url"] = payment.notifyUrl;

  // Buyer details
  if (payment.customerName) data["name_first"] = payment.customerName;
  if (payment.customerSurname) data["name_last"] = payment.customerSurname;
  if (payment.customerEmail) data["email_address"] = payment.customerEmail;
  if (payment.customerPhone) data["cell_number"] = payment.customerPhone;

  // Transaction details
  data["m_payment_id"] = payment.orderId;
  data["amount"] = payment.amount;
  data["item_name"] = payment.itemName.substring(0, 100); // PayFast max 100 chars
  data["item_description"] = `Galeo Beauty Order ${payment.orderId}`.substring(0, 255);

  // Generate signature
  data["signature"] = generateSignature(data);

  return data;
}

/**
 * Generate the MD5 signature for PayFast.
 * Parameters must be in the order they appear in the form data.
 */
function generateSignature(data: Record<string, string>): string {
  const passphrase = getPassphrase();

  // Build the signature string from all parameters in order
  const signatureString = Object.entries(data)
    .filter(([key]) => key !== "signature")
    .map(([key, value]) => `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}`)
    .join("&");

  const finalString = passphrase
    ? `${signatureString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : signatureString;

  return crypto.createHash("md5").update(finalString).digest("hex");
}

// ============================================
// ITN (INSTANT TRANSACTION NOTIFICATION) VALIDATION
// ============================================

export interface PayFastITNData {
  m_payment_id: string;
  pf_payment_id: string;
  payment_status: string;
  item_name: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  merchant_id: string;
  signature: string;
  [key: string]: string | undefined;
}

/**
 * Validate the PayFast ITN (webhook) data.
 * Returns true if the signature is valid and the payment can be trusted.
 */
export function validateITNSignature(data: PayFastITNData): boolean {
  const passphrase = getPassphrase();

  // Build the signature string from all params except 'signature'
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key !== "signature" && value !== undefined) {
      params[key] = value;
    }
  }

  const signatureString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}`)
    .join("&");

  const finalString = passphrase
    ? `${signatureString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : signatureString;

  const expectedSignature = crypto.createHash("md5").update(finalString).digest("hex");
  return expectedSignature === data.signature;
}

/**
 * Verify the ITN by calling PayFast's validation endpoint.
 * This is an additional server-to-server validation step.
 */
export async function verifyITNWithPayFast(data: PayFastITNData): Promise<boolean> {
  try {
    const validateUrl = getPayFastValidateUrl();
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        params.append(key, value);
      }
    }

    const response = await fetch(validateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const body = await response.text();
    return body.trim() === "VALID";
  } catch (error) {
    console.error("PayFast ITN verification failed:", error);
    return false;
  }
}

/**
 * Check that the merchant_id in the ITN matches our configured merchant_id.
 */
export function validateITNMerchant(data: PayFastITNData): boolean {
  return data.merchant_id === getMerchantId();
}
