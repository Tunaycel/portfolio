"use client";
import { useState } from "react";
import { trials } from "@/lib/research";
const stages = [
  {
    key: "ingestion",
    name: "Ingestion",
    description: "The event reaches the queryable telemetry pipeline.",
  },
  {
    key: "detection",
    name: "Detection",
    description:
      "The scheduled Sentinel rule evaluates the failed-login signal and creates the incident.",
  },
  {
    key: "response",
    name: "Response",
    description: "The automated response applies the network containment action.",
  },
] as const;
export function TrialExplorer() {
  const [selected, setSelected] = useState(0);
  const trial = trials[selected];
  return (
    <div className="trial-explorer">
      <div className="trial-legend">
        {stages.map((s) => (
          <span key={s.key}>
            <i className={`stage-${s.key}`} />
            {s.name}
          </span>
        ))}
        <span>Seconds / shared scale 0–650</span>
      </div>
      <div className="trial-list" role="group" aria-label="Select a measured trial">
        {trials.map((t, i) => (
          <button
            key={t.id}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
            aria-label={`Trial ${t.id}, total ${t.total.toFixed(1)} seconds`}
          >
            <span className="trial-id">0{t.id}</span>
            <span className="trial-track" aria-hidden="true">
              {stages.map((s) => (
                <span
                  key={s.key}
                  className={`stage-${s.key}`}
                  style={{ width: `${(t[s.key] / 650) * 100}%` }}
                />
              ))}
            </span>
            <strong>
              {t.total.toFixed(1)}
              <small>s</small>
            </strong>
          </button>
        ))}
      </div>
      <div className="trial-detail" aria-live="polite">
        <p className="eyebrow">Trial 0{trial.id} / Stage breakdown</p>
        <div>
          {stages.map((s) => (
            <article key={s.key}>
              <span>{s.name}</span>
              <strong>
                {trial[s.key].toFixed(1)}
                <small>s</small>
              </strong>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
        <p className="trial-note">
          Total: {trial.total.toFixed(1)} seconds. Stage timings are rounded individually; their sum
          may differ by 0.1 seconds.
        </p>
      </div>
      <details className="research-data">
        <summary>Read all measurements as a table</summary>
        <div className="research-table-scroll">
          <table>
            <caption>Controlled lab trials, 3 September 2026. All timings in seconds.</caption>
            <thead>
              <tr>
                <th scope="col">Trial</th>
                {stages.map((s) => (
                  <th key={s.key} scope="col">
                    {s.name}
                  </th>
                ))}
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {trials.map((t) => (
                <tr key={t.id}>
                  <th scope="row">{t.id}</th>
                  {stages.map((s) => (
                    <td key={s.key}>{t[s.key].toFixed(1)}</td>
                  ))}
                  <td>{t.total.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
