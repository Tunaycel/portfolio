import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { PrintButton } from "@/components/PrintButton";
export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Professional profile of Hüseyin Tunay Çelik: AI integration, full-stack development and cloud engineering.",
};
export default function Resume() {
  return (
    <main id="main" className="container resume-page">
      <div className="resume-actions">
        <Link className="text-link" href="/">
          ← Portfolio
        </Link>
        <PrintButton />
      </div>
      <header>
        <p className="eyebrow">Professional profile</p>
        <h1>Hüseyin Tunay Çelik</h1>
        <p className="resume-title">Software Engineer · AI / LLM Integration · Full-stack</p>
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
          Final-year Computer Science student building AI integrations, full-stack products and
          cloud systems. Experience with local LLM data extraction, product interfaces, API design
          and AWS deployment.
        </p>
      </section>
      <section>
        <h2>Experience</h2>
        <h3>Software Development Intern — Nest2Move</h3>
        <p className="resume-date">March 2026–present · Remote, Kraków</p>
        <ul>
          <li>
            Completed an initial 504 hours on Pro2Move: approvals, procurement, contracts and
            vendor-governance features using React, Fastify, Prisma and PostgreSQL.
          </li>
          <li>
            Built a local Ollama + Qwen enrichment pipeline across approximately 110 company
            websites.
          </li>
          <li>Implemented JWT authentication, middleware tests and a shared typed API client.</li>
          <li>
            Continued into solo PazarPilot development from July: unified marketplace operations
            with simulated integrations.
          </li>
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
          <strong>AI & cloud:</strong> Ollama, Qwen, Gemini, RAG, AWS, Azure, Docker, GitHub Actions
        </p>
      </section>
      <section>
        <h2>Education & credentials</h2>
        <p>
          <strong>B.Eng. Computer Science</strong> — WSB Merito University, Wrocław. Software
          Development specialisation; expected February 2027.
        </p>
        <p>
          Thesis: automated incident response and Zero Trust on Azure. Research target: 60%+ MTTR
          reduction; evaluation ongoing.
        </p>
        <p>
          <strong>Oracle Cloud Infrastructure 2025 Foundations Associate</strong> — awarded January
          2026, score 93%.
        </p>
        <p>Turkish: native · English: professional working proficiency · Polish: learning</p>
      </section>
    </main>
  );
}
