"use client";
import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
const filters = ["All work", "AI integration", "Full-stack", "Cloud & backend"] as const;
export type ProjectSummary = Pick<
  Project,
  "slug" | "name" | "category" | "summary" | "stack" | "role"
>;
export function Work({ projects }: { projects: ProjectSummary[] }) {
  const [filter, setFilter] = useState<string>("All work");
  const selected = projects.filter((p) => filter === "All work" || p.category === filter);
  return (
    <section className="section container" id="work">
      <p className="eyebrow">01 / Selected work</p>
      <div className="section-heading">
        <h2>
          Ideas, made <em>real.</em>
        </h2>
        <p>
          A selection of systems I’ve built.
          <br />
          The thinking behind the work, included.
        </p>
      </div>
      <div className="work-controls">
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
              {f === "All work" && <sup>05</sup>}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {String(selected.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="project-grid">
        {selected.map((p) => (
          <article className="project-card" key={p.slug}>
            <Link href={`/work/${p.slug}`} aria-label={`View ${p.name} case study`}>
              <ProjectVisual slug={p.slug} />
              <div className="project-card-top">
                <span className="eyebrow">{p.category}</span>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <div className="project-tags">
                {p.stack.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-role">{p.role}</div>
            </Link>
          </article>
        ))}
      </div>
      <a className="text-link" href="https://github.com/Tunaycel">
        More experiments on GitHub <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
