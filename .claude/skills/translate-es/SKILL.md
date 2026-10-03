---
name: translate-es
description: Translate portfolio copy into natural Mexican Spanish, or review an existing Spanish file for naturalness. Use when the user asks to translate a page, MDX file or message file into Spanish, runs /translate-es <file>, or asks whether the Spanish reads naturally.
---

# Translate to Mexican Spanish

Usage: `/translate-es <file>` — an MDX file, `messages/es.json`, or a page.

The goal is Spanish that reads as though Carlos wrote it, because he did write
the English. A recruiter in Mexico should not be able to tell which language
came first.

## Rules

- **Mexican Spanish, not neutral "LATAM" Spanish.** Use `tú` where the page
  addresses the reader, never `vos`, never `vosotros`. Avoid Iberian
  vocabulary: `vale`, `ordenador`, `móvil`, `coger`.
- **The title is "Desarrollador de software."** Not "Ingeniero de Software",
  not "Desarrollador Full Stack".
- **Keep technical terms in English where Mexican developers keep them in
  English.** Write *frontend*, *backend*, *deploy*, *pull request*,
  *framework*, *testing*, *machine learning*, *add-in*, *plugin*, *webhook*,
  *prompt*. Translating these reads like a textbook, not an engineer.
  Translate the ones that genuinely have ordinary Spanish: *base de datos*,
  *biblioteca*, *rendimiento*, *seguridad*, *inicio de sesión*, *suscripción*.
- **Never invent a fact.** Translation only. If the English says
  `[PLACEHOLDER]`, the Spanish says `[PLACEHOLDER]`. If a sentence would need a
  number the English does not have, stop and ask.
- **Sentence case** in headings, as in the English. Spanish does not capitalise
  every word in a heading.
- Keep Spanish typography: open `¿` and `¡`, use `·` as the separator, and keep
  the accents on capitals.
- Watch length: Spanish runs roughly 20% longer. If a translated UI string
  would break a layout, shorten the Spanish rather than letting it wrap
  awkwardly, and say that you did.
- Preserve all markup exactly: MDX components, JSX props, braces, links, code
  fences, frontmatter keys. Translate frontmatter *values* only.
- In `messages/es.json`, keep every key identical to `messages/en.json` and
  leave ICU placeholders untouched.

## Steps

1. Read the source file and its English counterpart.
2. Translate, or review and rewrite, under the rules above.
3. Re-read the result as a Spanish-first reader: flag any sentence that still
   sounds like a translation, and fix it.
4. Report, briefly: what you changed, any term you deliberately left in
   English, anything you shortened, and anything you could not translate
   without a fact Carlos has not given you.

Carlos approves all Spanish copy. Present it for approval; do not merge it
yourself.
