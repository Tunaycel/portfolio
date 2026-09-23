import Link from "next/link";
import { researchMetrics } from "@/lib/research";
import { ArrowIcon } from "./ArrowIcon";
export function ResearchFeature() {
  return (
    <section className="research-feature" id="research">
      <div className="container section">
        <div className="research-kicker">
          <p className="eyebrow">02 / Research in progress</p>
          <span className="research-status">THESIS · AZURE INCIDENT RESPONSE</span>
        </div>
        <div className="research-feature-grid">
          <div>
            <h2>
              From a signal.
              <br />
              To a decision.
              <br />
              <em>To containment.</em>
            </h2>
            <p className="research-lead">
              How much of incident response can we automate—and where does the time actually go?
            </p>
            <p>
              A repeatable Azure lab connecting telemetry, detection and network containment. Five
              controlled trials. One useful finding: detection, not the response action, dominates
              the wait.
            </p>
            <Link className="button dark" href="/research/azure-incident-response">
              Inside the research <ArrowIcon />
            </Link>
          </div>
          <div className="research-instrument">
            <div className="instrument-top">
              <span>EXPERIMENT / 005 RUNS</span>
              <span>03 SEP 2026</span>
            </div>
            <div className="instrument-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
              <b>
                DETECT
                <br />
                DECIDE
                <br />
                RESPOND
              </b>
            </div>
            <div className="research-numbers">
              <div>
                <strong>
                  {researchMetrics.response.toFixed(1)}
                  <small>s</small>
                </strong>
                <span>Median response stage</span>
              </div>
              <div>
                <strong>
                  {researchMetrics.total.toFixed(1)}
                  <small>s</small>
                </strong>
                <span>Median total containment</span>
              </div>
            </div>
            <p>
              One host · One scenario · Five trials
              <br />
              Early lab evidence; evaluation ongoing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
