import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@/content/projects";

function formatMonth(month: string, locale: string) {
  // "YYYY-MM" read as UTC, so no timezone can shift it into the month before.
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));
}

/** "Mar 2026 – present", with machine-readable `<time>` elements. */
export async function Timeframe({
  timeframe,
}: {
  timeframe: Project["timeframe"];
}) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("projects"),
  ]);

  return (
    <>
      {t.rich("timeframe", {
        startLabel: formatMonth(timeframe.start, locale),
        endLabel: timeframe.end
          ? formatMonth(timeframe.end, locale)
          : t("present"),
        start: (chunks) => <time dateTime={timeframe.start}>{chunks}</time>,
        // "present" is not a date, so it gets no <time>.
        end: (chunks) =>
          timeframe.end ? <time dateTime={timeframe.end}>{chunks}</time> : chunks,
      })}
    </>
  );
}
