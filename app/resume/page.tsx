import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { PrintButton } from "@/components/PrintButton";
import { ArrowIcon } from "@/components/ArrowIcon";
export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Experience, selected projects, education and technical skills of software engineer Hüseyin Tunay Çelik.",
};
export default function Resume() {
  return (
    <main id="main" className="container resume-page">
      <div className="resume-actions">
        <Link className="text-link" href="/">
          Portfolio
        </Link>
        <div className="resume-action-tools">
          <a className="button dark" href="/cv/huseyin-tunay-celik-cv.pdf" download>
            Download CV PDF <ArrowIcon direction="down" />
          </a>
          <PrintButton />
        </div>
      </div>
      <header>
        <p className="eyebrow">Professional profile</p>
        <h1>Hüseyin Tunay Çelik</h1>
        <p className="resume-title">Software Engineer · Product development · Cloud systems</p>
        <p>
          Wrocław, Poland · <a href="mailto:h.tunaycelik@gmail.com">h.tunaycelik@gmail.com</a>
        </p>
        <p>
          <a href="https://github.com/Tunaycel">github.com/Tunaycel</a> ·{" "}
          <a href="https://www.linkedin.com/in/huseyin-tunay-celik/">
            linkedin.com/in/huseyin-tunay-celik
          </a>
        </p>
      </header>
      <section>
        <h2>Profile</h2>
        <p>
          Final-year Computer Science student with experience building full-stack applications,
          cloud systems and applied machine-learning workflows. Recent work includes local language
          model data extraction, product interfaces, API design and AWS deployment.
        </p>
      </section>
      <section>
        <h2>Experience</h2>
        <h3>Software Engineering Intern — Nest2Move Sp. z o.o.</h3>
        <p className="resume-date">March–September 2026 · 6 months · Kraków (Remote)</p>
        <p>
          Full-stack development across two B2B SaaS products, from database schema to deployment.
        </p>
        <h4>Pro2Move — B2B procurement platform</h4>
        <ul>
          <li>
            Built JWT authentication with token generation and login verification; developed Fastify
            REST endpoints for approvals and documented and tested them with Postman.
          </li>
          <li>
            Designed Prisma schemas, PostgreSQL migrations and test-data seeds; implemented the
            Approvals Inbox and Detail views with approve, reject and delegate actions, payload
            validation, loading skeletons and error states.
          </li>
          <li>
            Built an LLM enrichment pipeline over approximately 110 company websites using locally
            hosted Qwen via Ollama and prompt templates to extract industry and market positioning.
          </li>
          <li>Connected the API Access frontend to the Apinizer request API.</li>
        </ul>
        <h4>PazarPilot — e-commerce integration platform</h4>
        <ul>
          <li>
            Architected a shared marketplace adapter interface and implemented REST clients with
            OAuth refresh and retry logic for listings and orders across two platforms.
          </li>
          <li>
            Built warehouse locations, inventory movements and stock overview, plus shipping API
            workflows for shipment creation, labels and status tracking.
          </li>
          <li>Containerised the stack with Docker and Docker Compose.</li>
        </ul>
      </section>
      <section>
        <h2>Selected projects</h2>
        {projects
          .filter((p) => p.slug !== "local-llm-pipeline")
          .map((p) => (
            <article key={p.slug}>
              <h3>
                {p.name} <span>— {p.role}</span>
              </h3>
              <p>{p.summary}</p>
              <p className="resume-date">
                {p.status} · {p.stack.join(" / ")}
              </p>
            </article>
          ))}
      </section>
      <section>
        <h2>Technical skills</h2>
        <p>
          <strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, Playwright
          <br />
          <strong>Backend & data:</strong> Python, FastAPI, Fastify, Flask, Prisma, SQLAlchemy,
          PostgreSQL
          <br />
          <strong>Applied machine learning & cloud:</strong> Ollama, Qwen, Gemini, RAG, AWS, Azure,
          Docker, GitHub Actions
        </p>
      </section>
      <section>
        <h2>Education & credentials</h2>
        <p>
          <strong>B.Eng. Computer Science</strong> — WSB Merito University, Wrocław. Software
          Development specialisation; expected February 2027.
        </p>
        <p>
          Thesis in progress: automated incident response on Azure. Built a Terraform-managed lab
          with Sentinel detection and Logic Apps containment. Five controlled trials recorded a
          13.0-second median response stage and 501.2-second median total containment time;
          evaluation ongoing.
        </p>
        <p>
          <strong>Oracle Cloud Infrastructure 2025 Foundations Associate</strong> — passed 7 January
          2026, score 93%.
        </p>
        <p>Turkish: native · English: professional working proficiency · Polish: learning</p>
      </section>
    </main>
  );
}
