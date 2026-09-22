# Hüseyin Tunay Çelik — Portfolio

A personal engineering portfolio focused on AI integration, full-stack products and cloud systems. A graphite-and-lime research studio pairs condensed typography, an interactive systems sculpture and original illustrations with substantive project case studies.

## Run locally

Use Node.js **22.18 or later** and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The site works without accounts, API keys or a database. Its default contact method is a direct email link.

For a production preview:

```sh
npm run build
npm start
```

## What is included

- Responsive homepage with self-hosted Antonio and IBM Plex typography, custom architectural illustrations and a lazy-loaded Three.js sculpture. Motion can be paused, respects reduced-motion preferences and stops outside the viewport. An SVG fallback keeps the composition intact without WebGL.
- Five filterable projects, each with a statically generated case-study page covering the problem, ownership, decisions and current status.
- Experience, skills, education and an Oracle certification gallery with the original certificate, plus a dedicated Azure thesis chapter at `/research/azure-incident-response`. Five documented trials can be inspected by stage through an accessible interactive chart and data table. Research is explicitly in progress.
- A printable professional profile at `/resume`, with the browser's Print / Save as PDF action.
- Optional server-side email delivery, with an honest direct-email fallback when unconfigured.
- Open Graph share image, favicon, metadata, configurable sitemap, robots rules and a custom 404.
- Backend tests, production HTTP smoke tests and GitHub Actions checks.

## Configuration

Copy `.env.example` to `.env.local` for local development. Never commit real values.

- `SITE_URL`: the final public origin, such as `https://your-domain.example`. Used for sitemap URLs, social metadata and contact origin validation. Set this before the production build. Without it, the sitemap is intentionally empty and no production domain is invented.
- `RESEND_API_KEY`: optional server-only Resend key. Required only for the contact form.
- `CONTACT_FROM`: sender address on a domain verified with Resend, for example `Portfolio <hello@your-domain.example>`.
- `CONTACT_TO`: recipient; defaults to the professional email shown on the portfolio. Visitors cannot override it.
- `TRUST_PROXY`: defaults to `false`. Only enable when your deployment's edge overwrites `x-forwarded-for` with a trustworthy client address.

When both delivery variables are available **at build time**, the homepage includes the form. Rebuild/redeploy after changing them. Otherwise it displays the email contact card. Do not enter real credentials into a PR description, client-side variable or chat message.

The endpoint uses the [Resend email API](https://resend.com/docs/api-reference/emails/send-email). A success response means the provider accepted the email; it does not claim inbox delivery. Live email delivery has not been exercised in this repository's tests, which mock provider responses and send no real messages.

## Deploy

This is a standard Next.js **Node.js server** application. Deploy the repository using a Next.js-compatible host, or run `npm ci`, `npm run build`, and `npm start` behind an HTTPS reverse proxy. Use Node 22.18+ and set `SITE_URL` to the final origin before building. Static-only GitHub Pages hosting does not support the contact endpoint.

1. Import `Tunaycel/portfolio` into the chosen host, or clone it onto your server.
2. Use the repository root, `npm ci` as the install command, and `npm run build` as the build command.
3. Configure `SITE_URL`. Configure email variables only if you want form delivery.
4. Put HTTPS in front of the app. If enabling the form on serverless or multiple instances, configure a shared/edge rate limit for `POST /api/contact`.
5. Deploy and check the home, project routes, `/resume`, `/robots.txt`, `/sitemap.xml` and share image.
6. With provider credentials configured, perform one authorized end-to-end email check.

No production hosting account or domain is connected by this repository. The source is deployable; a local preview is not a public deployment.

### Contact endpoint boundaries

`POST /api/contact` accepts JSON with `name`, `email`, `message`, and an empty `website` honeypot. It enforces same-origin requests, a 12 KB body limit, field lengths, a fixed recipient, an eight-second provider timeout and no-store responses. No message body or credential is logged or saved by application code.

The built-in limiter is **process-local**: five valid attempts per ten minutes, at most 1,000 active keys. By default all visitors share one bucket; untrusted forwarding headers cannot bypass it. This is deliberately conservative, but it is not distributed abuse protection. On multiple instances, add a provider/edge rate limit before enabling delivery. Origin checks and the honeypot are supporting measures, not authentication.

Status codes: 200 provider accepted; 400 invalid input; 403 wrong/missing origin; 413 oversized body; 415 incorrect media type; 429 throttled; 502 provider failure/unconfirmed delivery; 503 missing configuration.

## Project structure

```text
app/
  page.tsx                 Homepage composition
  globals.css              Tokens, layouts, illustrations, breakpoints and print styles
  work/[slug]/page.tsx      Static project case studies
  resume/page.tsx          Printable professional profile
  api/contact/route.ts     Thin server-side delivery adapter
  opengraph-image.tsx      Share-image generation using a local font
components/
  Hero.tsx                 Hero and systems illustration
  Work.tsx                 Small client-side filtering boundary
  ProjectVisual.tsx        Original code-native project artwork
  About.tsx                Experience, skills and research
  Contact.tsx              Configured form or direct email fallback
  ContactForm.tsx          Form validation, pending and result states
lib/
  projects.ts              Typed project content and source links
  contact.ts               Validation, bounded parsing, limiter and provider integration
  site.ts                  Canonical origin configuration
tests/
  contact.test.mjs         Backend tests with mocked delivery
  smoke.mjs                Production HTTP checks; no external email
```

Most content is server-rendered. Project filters, contact submission and printing are small client components. Case-study narratives stay out of the filtering component's browser payload. There is no WebGL dependency, loading gate, forced scrolling or custom cursor. Motion ends after five seconds and respects reduced-motion preferences.

## Checks and maintenance

```sh
npm test                 # backend validation and delivery failure cases
npm run build            # production build and static route generation
npm run typecheck        # route generation and TypeScript
npm run test:smoke       # starts production server on 3109, checks routes/API, then stops it
npm run format:check     # formatting rules
npm run format           # apply formatting
```

GitHub Actions runs these checks on pull requests and pushes to main. Smoke tests use a production build, require port 3109 to be free, and deliberately disable actual delivery. Browser QA is documented in [QA.md](QA.md); it is separate from the HTTP test suite.

Update project details in `lib/projects.ts`; update the profile and experience in `components/About.tsx` and `app/resume/page.tsx`. Keep all copies consistent. The supplied full CV PDF is **not published**; the printable profile uses the professional information on the website. See [CONTENT.md](CONTENT.md) for source precedence and claim boundaries.

## Contribution workflow

Create a focused branch for each section or change. Run the applicable checks, open a PR, review the diff and check results, then merge. Do not push feature work directly to main. The original implementation followed separate plan, foundation, case-study, backend and release branches.

See [PROJECT_PLAN.md](PROJECT_PLAN.md), [DESIGN.md](DESIGN.md), [CONTENT.md](CONTENT.md), [QA.md](QA.md), and [CHANGELOG.md](CHANGELOG.md).
