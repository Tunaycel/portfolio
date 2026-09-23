# Hüseyin Tunay Çelik — Software Engineer

Personal portfolio and engineering notes for my work across full-stack products, cloud systems and practical machine-learning integrations. Each project page explains what I worked on, the decisions behind it and what is currently implemented.

## Explore

- **Selected work:** five projects spanning marketplace operations, product interfaces, cloud applications and local language-model workflows.
- **Research:** an in-progress thesis on automated incident response in Azure, with the lab setup and measurements documented at `/research/azure-incident-response`.
- **Experience and credentials:** internship work, education, skills and an Oracle Cloud certification.
- **CV:** [read the web profile](/resume) or [download the original PDF](/cv/huseyin-tunay-celik-cv.pdf). The PDF is public and includes the personal contact details printed in the document.

The project write-ups distinguish implemented features from prototypes and work whose production rollout has not been verified. The AI Producer Platform is under development and will be added as a separate project entry when its portfolio case study is ready.

## Run locally

Requirements: Node.js **22.18+** and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The portfolio runs without accounts, API keys or a database. Contact links fall back to email unless optional form delivery is configured.

To build and run the production version locally:

```sh
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local` for local configuration. Keep real credentials out of Git. The example file contains no credentials or personal recipient address.

| Variable         | Purpose                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `SITE_URL`       | Public site origin used for canonical metadata and the sitemap. Set it before building for deployment. |
| `RESEND_API_KEY` | Optional, server-only key for contact form delivery.                                                   |
| `CONTACT_FROM`   | Sender address verified with Resend.                                                                   |
| `CONTACT_TO`     | Recipient address; defaults to the portfolio email.                                                    |
| `TRUST_PROXY`    | Set to `true` only when the hosting edge replaces forwarding headers with a trusted client address.    |

The contact form appears only when `RESEND_API_KEY` and `CONTACT_FROM` are present at build time. Otherwise, the page shows the direct email option. After changing these values, rebuild and redeploy.

Email is sent through the [Resend API](https://resend.com/docs/api-reference/emails/send-email). Automated tests mock the provider; they do not send messages or verify inbox delivery. The built-in rate limiter is process-local, so multi-instance deployments should add a shared or edge-level limit for `POST /api/contact`.

## Deployment

Deploy as a Next.js Node.js application on a compatible host, or run it behind an HTTPS reverse proxy. Use Node.js 22.18+, set `SITE_URL` before the production build, and configure email variables only if form delivery is needed. Static-only hosting such as GitHub Pages cannot run the contact endpoint.

After deployment, check the home page, project pages, `/resume`, `/robots.txt`, `/sitemap.xml` and the social share image. If enabling email delivery, test it once with an authorized recipient.

## Project layout

```text
app/                     Routes, metadata, styles and contact endpoint
components/              Page sections and interactive components
lib/projects.ts          Project summaries and case-study content
lib/research.ts          Thesis metrics and chart data
tests/                   Contact, research and production HTTP checks
public/                  Certificate and CV files, icons and other static assets
```

Most pages are server-rendered. Client-side code is limited to interactions such as project filtering, contact submission, the systems illustration and printing.

## Checks

```sh
npm test                 # Unit tests
npm run typecheck        # Next.js route types and TypeScript
npm run build            # Optimised production build
npm run test:smoke       # Production HTTP checks; uses port 3109
npm run format:check     # Prettier validation
```

GitHub Actions runs the checks for pull requests and pushes to `main`. The smoke test starts a local production server, checks routes and response headers, then stops it; contact delivery is disabled.

## Contributing and content

For project updates, use a focused branch, run the checks, open and review a pull request, then merge. Keep project descriptions consistent across `lib/projects.ts`, the case-study pages and the CV profile. See [CONTENT.md](CONTENT.md) for source notes and factual boundaries, [DESIGN.md](DESIGN.md) for visual decisions, and [QA.md](QA.md) for browser checks.
