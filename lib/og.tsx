import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { OG_SIZE } from "@/lib/metadata";

/**
 * Share images: one look for the site, the paper of the light theme. Satori
 * renders them at build time, so colours are literal here — they are the light
 * tokens from app/globals.css — and fonts are files, not next/font: IBM Plex
 * as WOFF from assets/fonts (Satori reads TTF, OTF and WOFF, not WOFF2).
 */
export { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/metadata";

const COLORS = {
  background: "#FAFAF7",
  foreground: "#141414",
  muted: "#5F5E5A",
  border: "#E4E3DD",
  brand: "#1F6F5C",
};

function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

async function loadFonts() {
  const [serif, sans, mono] = await Promise.all([
    font("IBMPlexSerif-Medium.woff"),
    font("IBMPlexSans-Regular.woff"),
    font("IBMPlexMono-Regular.woff"),
  ]);
  return [
    { name: "Plex Serif", data: serif, weight: 500 as const, style: "normal" as const },
    { name: "Plex Sans", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Plex Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * Splits a message's `<brand>…</brand>` span out, so the one highlighted word
 * can be green here as it is on the page. Satori has no inline layout, so the
 * line is laid out as flex-wrapped words; a word keeps any punctuation that
 * touches it ("features" + ".") as one item, so a line never breaks between
 * them.
 */
export function brandParts(message: string): ReactNode {
  const match = /^(.*)<brand>(.*)<\/brand>(.*)$/.exec(message);
  if (!match) return message;
  const [, before, brand, after] = match;

  const words: { text: string; brand: boolean }[][] = [];
  let startsWord = true;
  for (const [text, isBrand] of [
    [before, false],
    [brand, true],
    [after, false],
  ] as const) {
    for (const token of text.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        startsWord = true;
      } else if (startsWord) {
        words.push([{ text: token, brand: isBrand }]);
        startsWord = false;
      } else {
        words[words.length - 1].push({ text: token, brand: isBrand });
      }
    }
  }

  return words.map((segments, index) => (
    <div key={index} style={{ display: "flex", marginRight: "0.25em" }}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={segment.brand ? { color: COLORS.brand } : undefined}
        >
          {segment.text}
        </span>
      ))}
    </div>
  ));
}

export async function ogImage({
  label,
  title,
  body,
  footer,
  titleSize = 64,
}: {
  /** Mono line above the rule. */
  label: string;
  title: ReactNode;
  body?: string;
  /** Mono line at the foot. */
  footer: string;
  titleSize?: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background: COLORS.background,
          color: COLORS.foreground,
          fontFamily: "Plex Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Plex Mono",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLORS.muted,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            marginTop: 24,
            background: COLORS.brand,
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            fontFamily: "Plex Serif",
            fontWeight: 500,
            fontSize: titleSize,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        {body && (
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.45,
              color: COLORS.muted,
            }}
          >
            {body}
          </div>
        )}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: `2px solid ${COLORS.border}`,
            fontFamily: "Plex Mono",
            fontSize: 24,
            color: COLORS.muted,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
