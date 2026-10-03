// Adds the `meta` export every case-study MDX file declares to @types/mdx's
// `*.mdx` module. Typed `unknown` on purpose: content/mdx.ts parses it with
// Zod, so a malformed `meta` fails the build instead of being trusted.
declare module "*.mdx" {
  export const meta: unknown;
}
