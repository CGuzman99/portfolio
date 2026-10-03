import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import type { ProjectTag } from "@/content/projects";

export async function TagList({ tags }: { tags: readonly ProjectTag[] }) {
  const t = await getTranslations("projects");

  return (
    <ul aria-label={t("tagsLabel")} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            variant="outline"
            className="h-auto rounded-sm font-mono text-meta font-normal text-muted-foreground"
          >
            {t(`tags.${tag}`)}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
