# La Cime prototype — backlog & follow-ups

Items discussed in the redesign process that are **not** implemented on the site yet (or are ongoing maintenance).

## Enhancements (not on the site yet)

| Item | Notes |
|------|--------|
| **Trustindex widget embed** | Add the official `<script>` + container from the Trustindex dashboard (Widgets / configurator) under `#avis` when you have access. Docs: [Create widgets](https://www.trustindex.io/how-to-create-review-widgets-for-your-website/), [Insert code](https://www.trustindex.io/how-to-insert-your-widgets-code-into-your-site/). |
| **Massothérapie → modalités** | Optional: add an anchor (e.g. `#modalites-massotherapie`) at the bottom of the page and turn “modalités au bas de la page” in the addon card into a link to it. |
| **Plateau gourmand icon fallback** | If `🍽️` shows as a box on some devices, try `🧺` or a small inline SVG. |
| **Hero video (advanced)** | For maximum control and no YouTube chrome: host an `.mp4` (and optional `.webm`) and use `<video>` instead of the iframe. |
| **Hero sound** | Optional: muted autoplay as now; add an “Activer le son” control that unmutes on user click (browser-friendly). |
| **Structured data (SEO)** | Optional: JSON-LD `LocalBusiness` / aggregate rating aligned with public data (only if it matches what you actually display). |

## Maintenance

| Item | Notes |
|------|--------|
| **Review count** | The line **“478 avis”** should be updated when the total on [Trustindex](https://www.trustindex.io/reviews/la-cime.ca) changes. |
| **Trustindex quotes** | Keep excerpts aligned with live public reviews if you refresh copy. |

## How to track this (suggested workflow)

1. **Keep this file** (`BACKLOG.md`) in the repo as a lightweight checklist. Update it when you ship or drop an idea.
2. **GitHub Issues** — Turn larger items (e.g. Trustindex embed, video hosting) into issues so you can assign, discuss, and close them when done.
3. **One source of truth** — Either prioritize Issues *or* this file for “what’s next,” or use Issues for execution and `BACKLOG.md` only for high-level parking lot items.
4. **Don’t paste secrets** — Widget scripts are public embeds; still avoid API keys or dashboard passwords in git.

---

*Last aligned with the prototype state at commit time. Edit freely.*
