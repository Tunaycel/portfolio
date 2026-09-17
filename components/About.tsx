export function About() {
  return (
    <>
      <section className="about-section" id="about">
        <div className="container section">
          <p className="eyebrow">03 / The person behind the code</p>
          <div className="about-grid">
            <div>
              <h2>
                Curiosity, with
                <br />
                <em>follow-through.</em>
              </h2>
              <div className="identity-card">
                <span className="identity-monogram">
                  HTÇ<span>*</span>
                </span>
                <div>
                  <strong>Hüseyin Tunay Çelik</strong>
                  <span>Wrocław, Poland</span>
                  <span>Software engineer · Builder · Always learning</span>
                </div>
              </div>
            </div>
            <div className="about-copy">
              <p>
                I like the point where an idea becomes a working system. The interface someone uses.
                The API that makes it useful. The infrastructure that keeps it running.
              </p>
              <p>
                I’m a final-year Computer Science student at WSB Merito University, specialising in
                Software Development. Alongside my studies, I build full-stack products and
                integrate language models into real workflows.
              </p>
              <p>
                My current focus is AI / LLM engineering: connecting models to data and products,
                with the same care I bring to the rest of the stack.
              </p>
              <div className="about-facts">
                <div>
                  <span>Based in</span>
                  <strong>Wrocław, Poland</strong>
                </div>
                <div>
                  <span>Graduating</span>
                  <strong>February 2027</strong>
                </div>
                <div>
                  <span>Languages</span>
                  <strong>Turkish · English · Polish</strong>
                </div>
                <div>
                  <span>Interested in</span>
                  <strong>AI / LLM & software engineering</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="experience">
            <div>
              <p className="eyebrow">Experience / 2026 — present</p>
              <h3>
                Learning by
                <br />
                <em>shipping.</em>
              </h3>
            </div>
            <div>
              <div className="experience-title">
                <div>
                  <h3>Nest2Move</h3>
                  <p>Software Development Intern · Remote, Kraków</p>
                </div>
                <span>MAR 2026 — PRESENT</span>
              </div>
              <p>
                Started with 504 hours on Pro2Move, a B2B procurement SaaS. Continued into a second
                product, PazarPilot.
              </p>
              <ul>
                <li>
                  Full-stack features across approvals, procurement, contracts and vendor
                  governance.
                </li>
                <li>A local LLM enrichment pipeline over approximately 110 company websites.</li>
                <li>JWT authentication, middleware tests and a shared typed API client.</li>
                <li>Solo development of a multi-marketplace operations panel since July.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section container" id="approach">
        <p className="eyebrow">04 / Tools with a purpose</p>
        <div className="section-heading">
          <h2>
            Across the <em>stack.</em>
          </h2>
          <p>
            The right tool is the one that
            <br />
            helps the whole system work.
          </p>
        </div>
        <div className="skills-grid">
          {[
            [
              "01",
              "Interfaces",
              "React · Next.js · TypeScript",
              "Responsive product interfaces, typed API clients and end-to-end browser tests.",
            ],
            [
              "02",
              "Intelligence",
              "Python · Ollama · Qwen · Gemini",
              "Local inference, retrieval-augmented generation and structured data extraction.",
            ],
            [
              "03",
              "Systems",
              "FastAPI · Fastify · PostgreSQL",
              "APIs, authentication, data modelling and deterministic business logic.",
            ],
            [
              "04",
              "Infrastructure",
              "AWS · Azure · Docker · CI/CD",
              "Cloud storage, deployments, security automation and repeatable environments.",
            ],
          ].map(([n, title, stack, description]) => (
            <div key={n}>
              <span className="eyebrow">{n} /</span>
              <h3>{title}</h3>
              <p className="skill-stack">{stack}</p>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <div className="research">
          <div className="research-symbol" aria-hidden="true">
            ◎
          </div>
          <div>
            <p className="eyebrow">On my desk / Thesis research</p>
            <h3>
              Trust is verified.
              <br />
              <em>Response is automated.</em>
            </h3>
            <p>
              A repeatable Azure lab connects Sentinel detection to Logic Apps containment. Initial
              measurements cover five controlled trials; the dedicated research chapter explains the
              results and their limits.
            </p>
            <div className="project-tags">
              <span>Azure Sentinel</span>
              <span>SOAR</span>
              <span>Zero Trust</span>
            </div>
          </div>
          <div className="credential">
            <span className="eyebrow">Certification</span>
            <strong>
              Oracle Cloud
              <br />
              Infrastructure
            </strong>
            <p>
              2025 Foundations Associate
              <br />
              Awarded January 2026
            </p>
            <span className="credential-score">
              93<span>%</span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
