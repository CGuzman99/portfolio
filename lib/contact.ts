import { z } from "zod";

/**
 * The contact form's contract, shared by the client form and the server action
 * so both validate the same way. It can't live in app/actions/contact.ts: a
 * "use server" file may only export async functions.
 *
 * Error messages are keys under `contact.errors` in messages/{en,es}.json, not
 * English sentences, so the form can show them in either language.
 */

export const REASONS = ["job", "contract", "other"] as const;
export type Reason = (typeof REASONS)[number];

/** A submit sooner than this after the form mounted is treated as a bot. */
export const MIN_FILL_MS = 3000;

/** Maximum lengths, also interpolated into the `tooLong` message. */
export const LIMITS = {
  name: 100,
  email: 254,
  company: 100,
  message: 5000,
} as const;

/** What the visitor fills in, plus the honeypot. */
export const ContactFieldsSchema = z.object({
  name: z.string().trim().min(1, "required").max(LIMITS.name, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(LIMITS.email, "tooLong")
    .pipe(z.email("email")),
  company: z.string().trim().max(LIMITS.company, "tooLong"),
  reason: z.enum(REASONS, "reason"),
  message: z.string().trim().min(1, "required").max(LIMITS.message, "tooLong"),
  /**
   * Honeypot: hidden from people, so anything in it came from a bot. Named so
   * that browser autofill and password managers leave it alone.
   */
  hpUrl: z.string().max(1000),
});

export type ContactFields = z.infer<typeof ContactFieldsSchema>;

/** What the server action receives: the fields and how long filling took. */
export const ContactSchema = ContactFieldsSchema.extend({
  /**
   * Milliseconds from mount to submit, measured in the browser with
   * `performance.now()`. Measuring on one clock means a visitor whose system
   * clock disagrees with the server's is never mistaken for a bot.
   */
  elapsedMs: z.number(),
});

export type ContactResult = {
  status: "sent" | "invalid" | "spam" | "tooFast" | "failed";
};
