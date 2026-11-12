# Air Fryer Meals for Two — landing page

React + TypeScript + Tailwind (Vite).

```bash
npm install
npm run dev      # local
npm run build    # production build → dist/
```

## Change the checkout link
`src/config.ts` → `CHECKOUT_URL`. Every CTA reads it from there.

## Add the real cookbook content (nothing is invented)
- **Photos / cover:** cover.webp is the real Kiwify cover; solution-*.webp and final.webp are crops of it. To change, put files in `src/assets/images/` named `cover`, `hero`, `final`,
  `solution-1`, `solution-2`, `solution-3` (.webp/.jpg/.png/.avif). Use WebP, ~1200px wide max
  (hero/final ≤ 150 KB). Missing files fall back to a neutral illustration.
- **Recipe preview:** add real recipes (name, category, time exactly as in the PDF, image name)
  to `src/content/recipes.ts`. The section stays hidden until the list has entries.
