export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-meta">
        <p className="eyebrow">Software engineer / AI & full-stack</p>
        <p className="location">
          <span className="status-dot" /> Wrocław, Poland · Open to opportunities
        </p>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            Thoughtful code.
            <br />
            <em>Real-world</em>
            <br />
            impact<span className="accent">.</span>
          </h1>
          <div className="hero-intro">
            <span className="small-cross" aria-hidden="true">
              +
            </span>
            <p>
              I’m <strong>Hüseyin Tunay Çelik.</strong> I connect AI, interfaces and infrastructure
              to build products that do something useful.
            </p>
          </div>
          <a className="button dark" href="#work">
            Explore selected work <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div
          className="system-art"
          role="img"
          aria-label="An architectural illustration connecting interface, intelligence and infrastructure around a shared core"
        >
          <div className="art-top">
            <span>FIG. 01 — CONNECTED SYSTEMS</span>
            <span>HTÇ / 2026</span>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <svg className="art-lines" viewBox="0 0 500 500" aria-hidden="true">
            <path d="M80 130 L250 250 L420 160 M250 250 L375 400 M250 250 L95 370" />
            <path className="dashed" d="M80 130 L420 160 L375 400 L95 370 Z" />
            <circle cx="250" cy="250" r="150" />
          </svg>
          <div className="art-core">
            <div className="core-face face-top" />
            <div className="core-face face-left" />
            <div className="core-face face-right" />
            <span>tç.</span>
          </div>
          <div className="art-node node-interface">
            <i />
            Interface<small>React / Next.js</small>
          </div>
          <div className="art-node node-ai">
            <i />
            Intelligence<small>LLMs / RAG</small>
          </div>
          <div className="art-node node-cloud">
            <i />
            Infrastructure<small>AWS / Azure</small>
          </div>
          <div className="art-bottom">
            <span>DESIGNED TO WORK TOGETHER</span>
            <span className="art-coordinate">
              51.1079° N<br />
              17.0385° E
            </span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p>From the first idea to the last mile.</p>
        <div>
          <span>Full-stack engineering</span>
          <span>AI integration</span>
          <a href="/resume">View résumé ↗</a>
        </div>
        <a href="#work" aria-label="Scroll to selected work">
          ↓
        </a>
      </div>
    </section>
  );
}
