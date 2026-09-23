import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { TrialExplorer } from "@/components/TrialExplorer";
import { researchMetrics } from "@/lib/research";
import { ArrowIcon } from "@/components/ArrowIcon";
export const metadata: Metadata = {
  title: "Azure incident response — Thesis research",
  description:
    "An in-progress thesis on automated incident response: a repeatable Azure lab, five controlled trials and a measured breakdown of containment latency.",
};
export default function ResearchPage() {
  return (
    <>
      <Header />
      <main id="main" className="research-page container">
        <Link className="back-link" href="/#research">
          Back to portfolio
        </Link>
        <header className="research-page-heading">
          <p className="eyebrow">Research notebook / 01 · Thesis in progress</p>
          <h1>
            THE TIME
            <br />
            BETWEEN <em>DETECTION</em>
            <br />
            AND <em>ACTION.</em>
          </h1>
          <p>
            Automated incident response on Microsoft Azure.
            <br />
            An experiment in making security workflows measurable.
          </p>
          <div className="research-page-meta">
            <span>Hüseyin Tunay Çelik</span>
            <span>Evidence: September 2026</span>
            <span>Implementation + initial evaluation</span>
          </div>
        </header>
        <section className="research-chapter">
          <p className="eyebrow">01 / The question</p>
          <div>
            <h2>
              A fast action is only
              <br />
              <em>part of the story.</em>
            </h2>
            <p>
              Can an automated cloud workflow reliably turn a failed-login signal into network
              containment? And when the response itself is quick, what accounts for the rest of the
              delay?
            </p>
            <p>
              My thesis explores automated incident response in the context of Zero Trust. I built a
              controlled lab to follow an event across ingestion, detection and response, rather
              than reporting a single opaque timing.
            </p>
          </div>
        </section>
        <section className="research-architecture">
          <p className="eyebrow">02 / The implemented system</p>
          <h2>
            One signal.
            <br />
            <em>A complete chain.</em>
          </h2>
          <ol>
            {[
              [
                "01",
                "Collect",
                "Ubuntu + Azure Monitor Agent",
                "Authentication syslog flows into Log Analytics through a data collection rule.",
              ],
              [
                "02",
                "Detect",
                "Microsoft Sentinel + KQL",
                "A scheduled rule evaluates a five-minute window at five-minute intervals, using a five-failure threshold grouped by source.",
              ],
              [
                "03",
                "Decide",
                "Incident + entity mapping",
                "IP and host entities carry the context into the automated response workflow.",
              ],
              [
                "04",
                "Contain",
                "Logic Apps + NSG",
                "The workflow applies a network security group deny rule to block the source in the lab.",
              ],
            ].map(([n, name, tech, copy]) => (
              <li key={n}>
                <span className="eyebrow">
                  {n} <ArrowIcon />
                </span>
                <h3>{name}</h3>
                <strong>{tech}</strong>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
          <p className="architecture-note">
            Terraform provisions the environment for repeatable deployment and teardown. This
            diagram describes the implemented workflow; it does not run an attack or connect to live
            infrastructure.
          </p>
        </section>
        <section className="research-results">
          <p className="eyebrow">03 / Initial evidence</p>
          <div className="section-heading">
            <h2>
              Five runs.
              <br />
              <em>Follow the time.</em>
            </h2>
            <p>
              Select a trial to inspect its stages.
              <br />
              Measured data, not a live simulation.
            </p>
          </div>
          <TrialExplorer />
          <div className="research-findings">
            <article>
              <strong>
                {researchMetrics.response.toFixed(1)}
                <small>s</small>
              </strong>
              <h3>Median response stage</h3>
              <p>
                10.3–13.4 seconds across the five trials. The response stage was short and
                relatively consistent.
              </p>
            </article>
            <article>
              <strong>
                {researchMetrics.total.toFixed(1)}
                <small>s</small>
              </strong>
              <h3>Median total containment</h3>
              <p>
                379.3–620.5 seconds end to end. Detection latency contributed most of the delay and
                variation.
              </p>
            </article>
            <article>
              <strong>
                5<small>/5</small>
              </strong>
              <h3>Sources blocked in the lab</h3>
              <p>
                All five attack trials reached containment. Four of five finished within ten
                minutes.
              </p>
            </article>
          </div>
        </section>
        <section className="research-chapter research-limits">
          <p className="eyebrow">04 / What this tells us</p>
          <div>
            <h2>
              Evidence with
              <br />
              <em>boundaries.</em>
            </h2>
            <p>
              These are initial observations from one monitored host, one SSH brute-force scenario,
              one deployment and a fixed configuration. Five successful trials do not establish
              production reliability.
            </p>
            <p>
              A benign burst of three failed logins stayed below the configured threshold and did
              not alert. That is a sanity check, not a broad false-positive evaluation.
            </p>
            <p>
              The research originally targeted a 60% improvement in response time. Without a
              comparable manual baseline, these measurements do not establish that improvement. The
              medians above are calculated separately and should not be added together.
            </p>
            <p className="evidence-note">
              Source: the project’s experiment summary dated 3 September 2026, cross-checked against
              its documented implementation. This public page contains aggregate timings only;
              infrastructure identifiers and raw security logs are omitted. Thesis presentation and
              final evaluation are still ahead.
            </p>
          </div>
        </section>
        <section className="research-next">
          <p className="eyebrow">05 / The next experiment</p>
          <h2>
            Question the
            <br />
            <em>bottleneck.</em>
          </h2>
          <p>
            Vary the detection cadence and threshold. Compare near-real-time detection. Repeat
            across more hosts and scenarios. Establish a manual baseline before making an
            improvement claim.
          </p>
          <Link className="button dark" href="/#contact">
            Let’s talk about the research <ArrowIcon />
          </Link>
        </section>
      </main>
    </>
  );
}
