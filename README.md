# Portfolio

Personal site for Muhammad Haseeb — machine learning engineer.
Built with React 19 + Vite, deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run lint
npm run build    # also copies dist/index.html to dist/404.html, see below
npm run deploy   # builds, then publishes dist/ via gh-pages
```

## Structure

- `src/App.jsx` — all content lives in the `DATA` object at the top of the file;
  the components below it are presentational. Edit `DATA` to update the site.
  `DATA.services` drives "What I do", `DATA.caseStudies` drives the case
  studies page, and `DATA.availability` drives the status line in the rail.
- `src/App.css` — the whole design system. Tokens are defined once on `:root`
  and re-declared under `[data-theme='dark']`; nothing below uses a raw color.
- `index.html` — fonts, metadata, and the inline script that applies the
  stored theme before first paint.

## Routing

The site has exactly two routes, handled with a ~30-line hand-rolled router
in `App.jsx` (`usePathname`, `navigateTo`, `RouteLink`) rather than a router
dependency:

- `/` — the main scroll: Hero, Services, Experience, Projects, Research,
  About, Contact.
- `/case-studies` — a dedicated page, linked from the rail, not part of the
  home scroll. Each entry in `DATA.caseStudies` renders as its own section.

Because GitHub Pages has no server-side routing, `npm run build` runs a
`postbuild` step that copies `dist/index.html` to `dist/404.html`. That's
what lets a direct link or a refresh on `/portfolio/case-studies` work: GH
Pages serves `404.html` for any unmatched path, and since it's the same app
shell, the client router just reads the URL and renders the right page.

## Notes

- Every number in `DATA.caseStudies` is sourced from a real repository —
  primary sources (notebook cell outputs, `profiler.py`), not summaries.
  Before adding another one, verify claims against the actual code, not a
  README's prose, since those have been known to diverge.
- The contact form posts to Formspree (`src/App.jsx`, `ContactForm`).
- `vite.config.js` sets `base: "/portfolio/"` to match the GitHub Pages path.
