"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
const Scene = dynamic(() => import("./SpatialScene"), { ssr: false });
const modes = [
  {
    name: "Intelligence",
    label: "01 / AI INTEGRATION",
    detail: "Models connected to useful workflows.",
    stack: "OLLAMA · QWEN · GEMINI",
  },
  {
    name: "Product",
    label: "02 / FULL-STACK",
    detail: "Interfaces backed by considered systems.",
    stack: "NEXT.JS · TYPESCRIPT · FASTAPI",
  },
  {
    name: "Cloud",
    label: "03 / INFRASTRUCTURE",
    detail: "Deployable, observable, repeatable.",
    stack: "AZURE · AWS · TERRAFORM",
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
        <span className="eyebrow">SYSTEM STUDY / 001</span>
        <span className="sculpture-live">
          <i /> INTERACTIVE OBJECT
        </span>
      </div>
      <div className="sculpture-canvas" aria-hidden="true">
        <svg
          className={`sculpture-fallback ${ready && !failed ? "is-loaded" : ""}`}
          viewBox="0 0 600 600"
        >
          <defs>
            <radialGradient id="core-glow" cx="30%" cy="25%">
              <stop stopColor="#e2f2c3" />
              <stop offset=".5" stopColor="#a4bd7e" />
              <stop offset="1" stopColor="#31452b" />
            </radialGradient>
            <linearGradient id="band-metal" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#4b594d" />
              <stop offset=".25" stopColor="#e0e8d9" />
              <stop offset=".5" stopColor="#7b8b75" />
              <stop offset=".72" stopColor="#d2dccc" />
              <stop offset="1" stopColor="#3a483b" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="280" r="74" fill="url(#core-glow)" />
          {[-35, 25, 80].map((a, i) => (
            <ellipse
              key={a}
              cx="300"
              cy="280"
              rx={120 + i * 30}
              ry={65 + i * 15}
              fill="none"
              stroke="url(#band-metal)"
              strokeWidth="14"
              transform={`rotate(${a} 300 280)`}
            />
          ))}
        </svg>
        {eligible && !failed ? (
          <Scene mode={mode} motion={motion} onReady={onReady} onError={onError} />
        ) : null}
      </div>
      <span className="sculpture-orbit-label label-north">THINK</span>
      <span className="sculpture-orbit-label label-east">BUILD</span>
      <span className="sculpture-orbit-label label-south">SHIP</span>
      <div className="sculpture-readout">
        <span className="eyebrow">{modes[mode].label}</span>
        <p>{modes[mode].detail}</p>
        <small>{modes[mode].stack}</small>
      </div>
      <div className="sculpture-controls">
        <div role="group" aria-label="Explore engineering disciplines">
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
