import { ContactForm } from "./ContactForm";
import { ArrowIcon, SparkIcon } from "./ArrowIcon";
export function Contact() {
  const enabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
  return (
    <section className="contact-section" id="contact">
      <div className="section container">
        <p className="eyebrow">05 / The next chapter</p>
        <div className="contact-grid">
          <div>
            <h2>
              Let’s talk about
              <br />
              <em>your next project.</em>
            </h2>
            <p className="contact-intro">
              Looking for someone who can connect the dots?
              <br />
              For software engineering roles or project conversations, send me a note. I’m based in
              Wrocław and have worked with remote teams.
            </p>
            <a className="contact-email" href="mailto:h.tunaycelik@gmail.com">
              h.tunaycelik@gmail.com <ArrowIcon />
            </a>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/huseyin-tunay-celik/">
                LinkedIn <ArrowIcon />
              </a>
              <a href="https://github.com/Tunaycel">
                GitHub <ArrowIcon />
              </a>
              <a href="/resume">
                CV <ArrowIcon />
              </a>
            </div>
          </div>
          <div>
            {enabled ? (
              <ContactForm />
            ) : (
              <div className="contact-note">
                <SparkIcon />
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
                  Write me an email <ArrowIcon />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
