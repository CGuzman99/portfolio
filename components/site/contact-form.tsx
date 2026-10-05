"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useTransition } from "react";
import { Controller, useForm, type FieldError as RhfFieldError } from "react-hook-form";
import { toast } from "sonner";
import { sendContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ContactFieldsSchema,
  LIMITS,
  REASONS,
  type ContactFields,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type ErrorKey = "required" | "email" | "reason" | "tooLong";

// The shadcn default border (--input) is a quiet rule colour, too faint to
// mark a control's edge: WCAG 1.4.11 wants 3:1. muted-foreground at 70% gives
// about 3.2:1 on the light page and 4.1:1 on the dark one.
const controlClass = "border-muted-foreground/70 text-body md:text-body";

const DEFAULTS = {
  name: "",
  email: "",
  company: "",
  message: "",
  hpUrl: "",
} satisfies Partial<ContactFields>;

/**
 * The contact form. Zod validates on the client for instant feedback and again
 * in the server action, which also runs the spam checks: a honeypot field and
 * a minimum time between mount and submit. The outcome is announced by a
 * Sonner toast; field errors are linked to their controls and announced too.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const [pending, startTransition] = useTransition();
  // performance.now() at mount: a monotonic clock, local to this page.
  const startedAt = useRef<number | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFields>({
    resolver: zodResolver(ContactFieldsSchema),
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  function errorText(field: keyof typeof LIMITS | "reason", error?: RhfFieldError) {
    if (!error?.message) return undefined;
    const max = field === "reason" ? 0 : LIMITS[field];
    return t(`errors.${error.message as ErrorKey}`, { max });
  }

  /** Props that tie a control to its error message, when there is one. */
  function described(id: string, error?: RhfFieldError) {
    return {
      id,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
    } as const;
  }

  function send(values: ContactFields) {
    startTransition(async () => {
      const { status } = await sendContact({
        ...values,
        elapsedMs: performance.now() - (startedAt.current ?? performance.now()),
      });
      if (status === "sent") {
        toast.success(t("sent"));
        reset(DEFAULTS);
        startedAt.current = performance.now();
      } else if (status === "tooFast") {
        toast.error(t("tooFast"));
      } else {
        // Long enough to read, and to note the LinkedIn / Upwork fallback.
        toast.error(t("failed"), { duration: 10_000 });
      }
    });
  }

  return (
    <>
      <form
        method="post"
        noValidate
        aria-label={t("formLabel")}
        // Built per event, not in render: `send` reads a ref.
        onSubmit={(event) => void handleSubmit(send)(event)}
        className="relative"
      >
        <FieldGroup className="gap-6">
          <Field data-invalid={!!errors.name || undefined}>
            <FieldLabel htmlFor="contact-name">{t("name")}</FieldLabel>
            <Input
              {...register("name")}
              {...described("contact-name", errors.name)}
              autoComplete="name"
              className={cn("h-10", controlClass)}
            />
            <FieldError id="contact-name-error">
              {errorText("name", errors.name)}
            </FieldError>
          </Field>

          <Field data-invalid={!!errors.email || undefined}>
            <FieldLabel htmlFor="contact-email">{t("email")}</FieldLabel>
            <Input
              {...register("email")}
              {...described("contact-email", errors.email)}
              type="email"
              autoComplete="email"
              className={cn("h-10", controlClass)}
            />
            <FieldError id="contact-email-error">
              {errorText("email", errors.email)}
            </FieldError>
          </Field>

          <Field data-invalid={!!errors.company || undefined}>
            <FieldLabel htmlFor="contact-company">{t("company")}</FieldLabel>
            <Input
              {...register("company")}
              {...described("contact-company", errors.company)}
              autoComplete="organization"
              className={cn("h-10", controlClass)}
            />
            <FieldError id="contact-company-error">
              {errorText("company", errors.company)}
            </FieldError>
          </Field>

          <Controller
            control={control}
            name="reason"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel id="contact-reason-label" htmlFor="contact-reason">
                  {t("reason")}
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value ?? undefined)}
                  items={REASONS.map((reason) => ({
                    value: reason,
                    label: t(`reasons.${reason}`),
                  }))}
                >
                  <SelectTrigger
                    ref={field.ref}
                    onBlur={field.onBlur}
                    {...described("contact-reason", fieldState.error)}
                    aria-labelledby="contact-reason-label"
                    className={cn("h-10 w-full", controlClass)}
                  >
                    <SelectValue placeholder={t("reasonPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {REASONS.map((reason) => (
                      <SelectItem
                        key={reason}
                        value={reason}
                        className="text-body md:text-body"
                      >
                        {t(`reasons.${reason}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="contact-reason-error">
                  {errorText("reason", fieldState.error)}
                </FieldError>
              </Field>
            )}
          />

          <Field data-invalid={!!errors.message || undefined}>
            <FieldLabel htmlFor="contact-message">{t("message")}</FieldLabel>
            <Textarea
              {...register("message")}
              {...described("contact-message", errors.message)}
              rows={6}
              className={cn("min-h-40", controlClass)}
            />
            <FieldError id="contact-message-error">
              {errorText("message", errors.message)}
            </FieldError>
          </Field>

          {/* Honeypot: off-screen and out of the tab order and the
              accessibility tree, so only a bot fills it in. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label htmlFor="contact-hp">{t("honeypot")}</label>
            <input
              {...register("hpUrl")}
              id="contact-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            {/* Not `disabled` while pending: focus would drop to <body>. */}
            <Button
              type="submit"
              size="lg"
              aria-busy={pending}
              onClick={(event) => {
                if (pending) event.preventDefault();
              }}
              className="h-10 px-4 text-body"
            >
              {pending ? t("sending") : t("submit")}
            </Button>
          </div>
        </FieldGroup>
      </form>
      <Toaster
        containerAriaLabel={t("notifications")}
        toastOptions={{ closeButtonAriaLabel: t("closeNotification") }}
      />
    </>
  );
}
