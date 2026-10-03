import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const SRC = "/about/photo.jpg";

/**
 * Carlos's photo on About. Until public/about/photo.jpg is added, a framed
 * [PLACEHOLDER] slot holds its place, so the layout is final either way.
 */
export async function Portrait() {
  const t = await getTranslations("about");
  const exists = existsSync(path.join(process.cwd(), "public", SRC));

  if (!exists) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-sm border border-dashed border-border p-4 text-center font-mono text-meta text-muted-foreground">
        {t("photoPending")}
      </div>
    );
  }

  return (
    <Image
      src={SRC}
      alt={t("photoAlt")}
      width={800}
      height={800}
      sizes="(min-width: 768px) 15rem, 100vw"
      preload
      className="aspect-square w-full rounded-sm border border-border object-cover"
    />
  );
}
