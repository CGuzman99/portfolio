import Image from "next/image";

/** Every shot from `npm run shots` is a 1440×900 viewport. */
const WIDTH = 1440;
const HEIGHT = 900;

/**
 * A screenshot captured in both themes: `<src>.light.png` and `<src>.dark.png`
 * under public/. The `.dark` class next-themes sets picks which one shows.
 *
 * Both images keep the default `loading="lazy"`, so only the visible one is
 * fetched; `preload` or `loading="eager"` would load both. The hero asks for
 * `fetchPriority="high"` instead (node_modules/next/dist/docs, Image, "Theme
 * detection").
 */
export function Screenshot({
  src,
  alt,
  priority = false,
}: {
  /** Path under public/ without the theme and extension, e.g. /projects/fibrant/hero */
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const shared = {
    width: WIDTH,
    height: HEIGHT,
    // The text column: 68ch at most, the full width less the gutters below.
    sizes: "(min-width: 1024px) 680px, calc(100vw - 48px)",
    fetchPriority: priority ? ("high" as const) : undefined,
    className: "h-auto w-full",
  };

  return (
    <>
      <Image {...shared} alt={alt} src={`${src}.light.png`} className={`${shared.className} dark:hidden`} />
      <Image {...shared} alt={alt} src={`${src}.dark.png`} className={`${shared.className} hidden dark:block`} />
    </>
  );
}
