"use server";

import { getLocale } from "next-intl/server";
import { Resend } from "resend";
import {
  ContactSchema,
  MIN_FILL_MS,
  type ContactResult,
  type Reason,
} from "@/lib/contact";

/** Resend's shared test sender: delivers only to the account owner's address. */
const TEST_SENDER = "Portfolio <onboarding@resend.dev>";

// The email goes to Carlos, not to visitors, so it is English and stays here
// rather than in messages/.
const REASON_LABELS: Record<Reason, string> = {
  job: "Job opportunity",
  contract: "Contract project",
  other: "Other",
};

/** Collapses whitespace so a value can't add lines to a subject or header. */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ");
}

/**
 * Validates and sends a contact-form message. Public like every server
 * action, so it trusts nothing from the client: the schema runs again here.
 *
 * Env, read per call so the build needs no secrets:
 * - `RESEND_API_KEY`, `CONTACT_TO` — required to send;
 * - `RESEND_FROM` — the verified-domain sender, once there is one;
 * - `CONTACT_DRY_RUN=1` — log instead of sending, for the e2e suite. Ignored
 *   on Vercel, so it can never silence the deployed form.
 */
export async function sendContact(input: unknown): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) return { status: "invalid" };

  const { name, email, company, reason, message, hpUrl, elapsedMs } =
    parsed.data;
  if (hpUrl !== "") return { status: "spam" };
  if (elapsedMs < MIN_FILL_MS) return { status: "tooFast" };

  const locale = await getLocale();
  const subject = `[Portfolio] ${REASON_LABELS[reason]} — ${oneLine(name)}`;
  const text = [
    `Name: ${oneLine(name)}`,
    `Email: ${email}`,
    `Company: ${company ? oneLine(company) : "—"}`,
    `Reason: ${REASON_LABELS[reason]}`,
    `Site language: ${locale}`,
    "",
    message,
  ].join("\n");

  if (process.env.CONTACT_DRY_RUN === "1" && !process.env.VERCEL) {
    console.info(`contact (dry run): ${subject}`);
    return { status: "sent" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO is not set");
    return { status: "failed" };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM || TEST_SENDER,
      to,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      console.error("contact: Resend rejected the message", error);
      return { status: "failed" };
    }
  } catch (error) {
    console.error("contact: Resend request failed", error);
    return { status: "failed" };
  }

  return { status: "sent" };
}
