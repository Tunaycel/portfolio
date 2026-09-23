import Link from "next/link";
import { SystemSculpture } from "./SystemSculpture";
import { ArrowIcon } from "./ArrowIcon";
export function Hero() {
  return (
    <section className="studio-hero container" aria-labelledby="hero-title">
      <div className="studio-hero-top">
        <p className="eyebrow">
          <span className="status-dot" /> Open to software engineering roles
        </p>
        <span className="eyebrow">Wrocław, PL / 51° N 17° E</span>
      </div>
      <div className="studio-hero-grid">
        <div className="studio-hero-copy">
          <p className="hero-name">
            HÜSEYİN TUNAY ÇELİK <ArrowIcon />
          </p>
          <h1 id="hero-title">
            I BUILD
            <br />
            <span className="outline-word">USEFUL</span>
            <br />
            <span className="lime-word">
              SOFTWARE<span className="hero-period">.</span>
            </span>
          </h1>
          <p className="studio-hero-intro">
            Software engineer working across
            <br className="desktop-break" />{" "}
            <strong>product engineering, applied machine learning & cloud systems.</strong>
            <br />
            From an idea to something that works.
          </p>
          <div className="hero-actions">
            <a className="button dark" href="#work">
              Explore my work <ArrowIcon direction="down-right" />
            </a>
            <Link className="hero-resume" href="/resume">
              View CV <ArrowIcon />
            </Link>
          </div>
        </div>
        <SystemSculpture />
      </div>
      <div className="studio-hero-foot">
        <span className="eyebrow">Work & research / 2026</span>
        <p>
          From first design to working software.
          <br />
          <strong>Built with care for the details.</strong>
        </p>
        <a href="#work" aria-label="Scroll to selected work">
          <ArrowIcon direction="down" />
        </a>
      </div>
    </section>
  );
}
