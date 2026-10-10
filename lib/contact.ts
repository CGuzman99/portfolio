// zod/mini through named imports, not classic zod or the `z` namespace: this
// schema ships to the browser with the form, and only this combination
// tree-shakes down to the few checks used here. Classic zod, or mini's `z`
// object, also drags in every locale's error messages — together over 100 KB
// that cost /contact its Lighthouse performance budget (M8).
import {
  email,
  enum as enumOf,
  extend,
  maxLength,
  minLength,
  number,
  object,
  pipe,
  string,
  trim,
  type output,
} from "zod/mini";

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

/** A trimmed string, required unless `optional`, at most `max` long. */
function text(max: number, { optional = false } = {}) {
  return string().check(
    trim(),
    ...(optional ? [] : [minLength(1, "required")]),
    maxLength(max, "tooLong"),
  );
}

/** What the visitor fills in, plus the honeypot. */
export const ContactFieldsSchema = object({
  name: text(LIMITS.name),
  email: pipe(text(LIMITS.email), email("email")),
  company: text(LIMITS.company, { optional: true }),
  reason: enumOf(REASONS, "reason"),
  message: text(LIMITS.message),
  /**
   * Honeypot: hidden from people, so anything in it came from a bot. Named so
   * that browser autofill and password managers leave it alone.
   */
  hpUrl: string().check(maxLength(1000)),
});

export type ContactFields = output<typeof ContactFieldsSchema>;

/** What the server action receives: the fields and how long filling took. */
export const ContactSchema = extend(ContactFieldsSchema, {
  /**
   * Milliseconds from mount to submit, measured in the browser with
   * `performance.now()`. Measuring on one clock means a visitor whose system
   * clock disagrees with the server's is never mistaken for a bot.
   */
  elapsedMs: number(),
});

export type ContactResult = {
  status: "sent" | "invalid" | "spam" | "tooFast" | "failed";
};
