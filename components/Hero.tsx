import Link from "next/link";
import { SystemSculpture } from "./SystemSculpture";
export function Hero() {
  return (
    <section className="studio-hero container" aria-labelledby="hero-title">
      <div className="studio-hero-top">
        <p className="eyebrow">
          <span className="status-dot" /> Available for the next challenge
        </p>
        <span className="eyebrow">Wrocław, PL / 51° N 17° E</span>
      </div>
      <div className="studio-hero-grid">
        <div className="studio-hero-copy">
          <p className="hero-name">
            HÜSEYIN TUNAY ÇELIK <span>↗</span>
          </p>
          <h1 id="hero-title">
            BUILDING
            <br />
            <span className="outline-word">WHAT’S</span>
            <br />
            <span className="lime-word">
              NEXT<span className="hero-period">.</span>
            </span>
          </h1>
          <p className="studio-hero-intro">
            Software engineer at the intersection of
            <br className="desktop-break" />{" "}
            <strong>AI, full-stack products & cloud systems.</strong>
            <br />
            From an idea to something that works.
          </p>
          <div className="hero-actions">
            <a className="button dark" href="#work">
              Explore my work <span>↘</span>
            </a>
            <Link className="hero-resume" href="/resume">
              View résumé <span>↗</span>
            </Link>
          </div>
        </div>
        <SystemSculpture />
      </div>
      <div className="studio-hero-foot">
        <span className="eyebrow">Selected work & research / 2026</span>
        <p>
          Ideas are a starting point.
          <br />
          <strong>I like making them real.</strong>
        </p>
        <a href="#work" aria-label="Scroll to selected work">
          ↓
        </a>
      </div>
    </section>
  );
}
