# growrevenue.co

Static Astro site for The Grow Revenue Company, deployed to Cloudflare Pages.

- `npm run build` builds to `dist/` and runs `tools/postbuild.py` (truthful sitemap lastmod, llms.txt, rss.xml; state in `tools/content-state.json`).
- `python3 tools/validate.py dist` runs the checklist gate. Any BLOCK fails.
- Facts and prices live in `src/data/site.ts` and `src/data/cases.ts` only.
- Lead form: `functions/api/lead.ts` (Pages Function) stores to D1 `growrevenue-leads` and notifies Telegram. Secrets: TG_TOKEN, TG_CHAT.
- Checklist source: `checklist/growrevenue-seo-aio-geo-checklist-2026-10.xlsx`.
- Preview project: growrevenue-v2 (pages.dev, noindex). Production: the `growrevenue` Pages project bound to growrevenue.co (cutover pending approval).
