import { getLocale, getTranslations } from "next-intl/server";

/** "YYYY" or "YYYY-MM", the two precisions content-sources.md gives. */
type Period = { start: string; end: string | null };

function formatPeriod(value: string, locale: string) {
  // Year only: nothing to localise, and no month may be invented for it.
  if (/^\d{4}$/.test(value)) return value;
  // "YYYY-MM" read as UTC, so no timezone can shift it into the month before.
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`));
}

/** "Mar 2026 – present", with machine-readable `<time>` elements. */
export async function Timeframe({ timeframe }: { timeframe: Period }) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("projects"),
  ]);

  return (
    <>
      {t.rich("timeframe", {
        startLabel: formatPeriod(timeframe.start, locale),
        endLabel: timeframe.end
          ? formatPeriod(timeframe.end, locale)
          : t("present"),
        start: (chunks) => <time dateTime={timeframe.start}>{chunks}</time>,
        // "present" is not a date, so it gets no <time>.
        end: (chunks) =>
          timeframe.end ? <time dateTime={timeframe.end}>{chunks}</time> : chunks,
      })}
    </>
  );
}
