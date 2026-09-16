import { ContactForm } from "./ContactForm";
export function Contact() {
  const enabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
  return (
    <section className="contact-section" id="contact">
      <div className="section container">
        <p className="eyebrow">04 / The next chapter</p>
        <div className="contact-grid">
          <div>
            <h2>
              Good things start
              <br />
              with a <em>conversation.</em>
            </h2>
            <p className="contact-intro">
              Looking for someone who can connect the dots?
              <br />
              I’m interested in AI / LLM and software engineering opportunities in Poland and remote
              teams.
            </p>
            <a className="contact-email" href="mailto:h.tunaycelik@gmail.com">
              h.tunaycelik@gmail.com <span>↗</span>
            </a>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/huseyin-tunay-celik/">LinkedIn ↗</a>
              <a href="https://github.com/Tunaycel">GitHub ↗</a>
              <a href="/resume">Résumé ↗</a>
            </div>
          </div>
          <div>
            {enabled ? (
              <ContactForm />
            ) : (
              <div className="contact-note">
                <span className="contact-asterisk" aria-hidden="true">
                  ✳
                </span>
                <p className="eyebrow">A direct line</p>
                <h3>
                  A role. An idea.
                  <br />
                  <em>A good question.</em>
                </h3>
                <p>
                  Email is the best way to reach me. Tell me what you’re working on, and let’s take
                  it from there.
                </p>
                <a className="button dark" href="mailto:h.tunaycelik@gmail.com">
                  Write me an email <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
