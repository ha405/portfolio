# Muhammad Haseeb — Portfolio

A technical portfolio built with React 19 and Vite. Locally served IBM Plex Sans, a single-column page, open project rows, and restrained separators keep the emphasis on readable content.

## Development

```sh
npm install
npm run dev
npm run lint
npm run build
```

The site is served at `/portfolio/`. The build also creates `dist/404.html` for GitHub Pages deep links. `npm run deploy` publishes the build; deployment is a separate action.

## Editing content

- `src/content.js`: experimental case studies, project descriptions, expertise, and work history.
- `src/App.jsx`: homepage copy, services, contact form, and page components.
- `src/App.css`: colors, typography, layouts, responsive rules, and reduced-motion support.
- `index.html`: metadata. `src/main.jsx` imports the Latin subset of IBM Plex Sans from Fontsource; no third-party font requests are needed at runtime.

The homepage contains selected projects, technical case studies, expertise, experience, and contact. `/portfolio/case-studies/` contains three studies with independently linkable anchors: `#pruning`, `#quantization`, and `#distillation`. Navigation uses ordinary links, including browser back/forward and new-tab support.

Four projects appear as open rows, followed by an additional project link. A native disclosure keeps the contact form keyboard-accessible without adding visual clutter.

Typography and structure were informed by direct inspection of [Paco Coursey](https://paco.me/), [Guillermo Rauch](https://rauchg.com/), and [Lee Robinson](https://leerob.com/): restrained type scales, concise project descriptions, and clear content categories. The implementation and content remain specific to this portfolio.

## Content integrity

The studies are independent experiments, not client engagements. Measurements were preserved from the previous portfolio records and were not newly reproduced during the redesign. Keep the qualifications alongside the numbers. Before adding or updating a claim, check the underlying experiment outputs, model, dataset, and runtime.

The distillation configurations use different architectures; the copy deliberately does not attribute their entire accuracy difference to the training method. Quantization reduced recorded size but increased measured latency in these tests.

## Contact

The expandable brief form retains the existing Formspree endpoint, with validation, pending, success, and error states. The email link remains available independently. Test production delivery with an intentional enquiry before relying on the form for incoming leads.
