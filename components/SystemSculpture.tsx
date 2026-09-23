"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
const Scene = dynamic(() => import("./SpatialScene"), { ssr: false });
const modes = [
  {
    name: "01 Data",
    label: "01 / COLLECT WEBSITE DATA",
    detail: "Public company websites become the input.",
    stack: "~110 WEBSITES · SECURE SCRAPING",
  },
  {
    name: "02 Model",
    label: "02 / EXTRACT WITH A LOCAL MODEL",
    detail: "Ollama + Qwen extract company metadata.",
    stack: "LOCAL INFERENCE · STRUCTURED EXTRACTION",
  },
  {
    name: "03 Output",
    label: "03 / MAKE IT USEFUL",
    detail: "Structured records flow into PostgreSQL.",
    stack: "PRISMA · POSTGRESQL · PRODUCT DATA",
  },
];
export function SystemSculpture() {
  const [mode, setMode] = useState(0),
    [motion, setMotion] = useState(false),
    [eligible, setEligible] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotion(!reduce.matches);
    };
    update();
    reduce.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEligible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    if (host.current) observer.observe(host.current);
    return () => {
      reduce.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  const onReady = useCallback(() => setReady(true), []),
    onError = useCallback(() => setFailed(true), []);
  return (
    <div className="sculpture" ref={host}>
      <div className="sculpture-index">
        <span className="eyebrow">LOCAL LLM / WORKFLOW</span>
        <span className="sculpture-live">
          <i /> EXPLORE THE LAYERS
        </span>
      </div>
      <div className="sculpture-canvas" aria-hidden="true">
        <svg
          className={`sculpture-fallback ${ready && !failed ? "is-loaded" : ""}`}
          viewBox="0 0 600 600"
        >
          <defs>
            <linearGradient id="plate-metal" x2="1" y2="1">
              <stop stopColor="#9baa93" />
              <stop offset="1" stopColor="#354638" />
            </linearGradient>
          </defs>
          {[360, 260, 160].map((y, i) => (
            <g key={y}>
              <path
                d={`M130 ${y} 330 ${y - 75} 490 ${y + 10} 290 ${y + 95}Z`}
                fill="url(#plate-metal)"
                stroke="#b2c0a8"
              />
              <path
                d={`M130 ${y}V${y + 15}L290 ${y + 110} 490 ${y + 25}V${y + 10}L290 ${y + 95}Z`}
                fill="#233729"
                stroke="#667e5a"
              />
              <path
                d={`M185 ${y + 5} 330 ${y - 48} 430 ${y + 7} 290 ${y + 68}Z`}
                fill={mode === i ? "#a9d27c" : "#455b3c"}
              />
            </g>
          ))}
        </svg>
        {eligible && !failed ? (
          <Scene mode={mode} motion={motion} onReady={onReady} onError={onError} />
        ) : null}
      </div>
      <span className="sculpture-orbit-label label-north">03 / OUTPUT</span>
      <span className="sculpture-orbit-label label-east">02 / MODEL</span>
      <span className="sculpture-orbit-label label-south">01 / DATA</span>
      <div className="sculpture-readout">
        <span className="eyebrow">{modes[mode].label}</span>
        <p>{modes[mode].detail}</p>
        <small>{modes[mode].stack}</small>
        <a className="workflow-case-link" href="/work/local-llm-pipeline">
          Read the project <ArrowIcon />
        </a>
      </div>
      <div className="sculpture-controls">
        <div role="group" aria-label="Explore local LLM workflow stages">
          {modes.map((m, i) => (
            <button key={m.name} onClick={() => setMode(i)} aria-pressed={mode === i}>
              {m.name}
            </button>
          ))}
        </div>
        <button
          className="motion-control"
          onClick={() => setMotion((m) => !m)}
          aria-label={motion ? "Pause sculpture motion" : "Play sculpture motion"}
        >
          {motion ? "Ⅱ" : "▷"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {modes[mode].name}: {modes[mode].detail}
      </p>
    </div>
  );
}
