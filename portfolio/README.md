# Abdul Rehman Ansari - Data Analyst Portfolio

Static, accessible portfolio built with HTML generated from `src/data.mjs` and `src/render.mjs`. It uses Node.js built-ins only; no frontend framework or third-party runtime dependencies are required.

## Local build and preview

```sh
npm install
npm run build
npm test
npm start
```

Open `http://127.0.0.1:4173` after starting the preview server. The static site is written to `dist/`, including the homepage, five case studies, and the resume PDF.

## Structure

- `src/data.mjs` contains the verified profile, project, experience, education, certification, and skill content.
- `src/render.mjs` generates the homepage and project case-study pages.
- `src/site.css` contains the editorial layout and responsive styles; `src/overrides.css` contains focus, reduced-motion, and print rules.
- `public/` contains the resume, favicon, and social card. The Sales Performance case study loads its dashboard image from that project's public GitHub repository.
- `scripts/` contains the build, preview, and verification scripts.

## Projects and source links

Five case studies are included: Bluestock Mutual Fund Analytics Platform, Customer Behaviour Analytics, Airline Operations Analytics, Sales Performance Analytics Dashboard, and Ferns & Petals Business Analytics. GitHub links appear only for projects with verified public repositories. No dashboard share URL is listed.

Experience and project facts follow the LinkedIn profile information provided and public repositories under [abdulrehman2108](https://github.com/abdulrehman2108). The airline case study uses the documented AiVariant internship evidence; it does not claim that "High Cloud Airlines" is the verified project name.

## Search metadata

The build emits canonical URLs, Open Graph metadata, `sitemap.xml`, and `robots.txt` for `https://abdul-rehman-portfolio-sable-xi.vercel.app`. Set `SITE_URL` during a future build if the production hostname changes.

## Deployment

`vercel.json` configures the static build command and `dist` output directory. For the GitHub monorepo, set the Vercel Root Directory to `portfolio` so this configuration and `package.json` are read from the application directory. No credentials or tokens belong in the repository.
