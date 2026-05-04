import { Resend } from "resend";

// Centralized Resend client. RESEND_API_KEY may be missing in some envs (e.g.
// preview deploys without secrets) — callers should treat email as best-effort
// and log failures rather than blocking primary work.
//
// Until sneakpriceapp.com is domain-verified in Resend, the sandbox
// `onboarding@resend.dev` sender only delivers to the Resend account owner's
// inbox (`ADMIN_EMAIL`). Per-user delivery flips on by changing FROM_DOMAIN_VERIFIED
// to true once DNS is set.
const FROM_DOMAIN_VERIFIED = false;

export const ALERT_FROM = FROM_DOMAIN_VERIFIED
  ? "SneakPrice Alerts <alerts@sneakpriceapp.com>"
  : "SneakPrice <onboarding@resend.dev>";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "zoomzoom@gmx.com";

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Picks the actual delivery address. In sandbox mode this is always
// ADMIN_EMAIL; the user's address is preserved in the email body so the admin
// knows whose alert fired.
export function deliveryAddress(userEmail: string): string {
  return FROM_DOMAIN_VERIFIED ? userEmail : ADMIN_EMAIL;
}
