"use client";

import { motion } from "framer-motion";
import { DecryptText } from "@/components/DecryptText";
import { SkillTag } from "./SkillTag";

const skills = [
  "Azure Sentinel",
  "KQL",
  "Azure Logic Apps",
  "Conditional Access",
  "Network Security Groups",
  "Kali Linux",
  "Microsoft Defender",
  "Entra ID"
];

const card = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(57,255,138,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8 font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-glow/80">
          <span className="size-1.5 rounded-full bg-cyan-glow animate-pulse" />
          <span>03 · NODES</span>
          <span className="flex-1 h-px bg-cyan-glow/20 ml-4" />
        </div>

        <h2 className="font-display font-semibold leading-[1.05] tracking-tight text-bone
                       text-[clamp(2rem,5.6vw,4.4rem)] mb-12">
          <DecryptText text="The Graph." stagger={26} cipherDuration={500} />
        </h2>

        {/* BENTO GRID with embedded SVG node graph */}
        <div className="grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 min-h-[820px]">
          {/* INTERNSHIP — primary node */}
          <motion.div
            variants={card} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={0}
            className="col-span-12 md:col-span-7 row-span-3 glass-strong rounded-md p-7 md:p-9 relative overflow-hidden group"
            data-cursor="hover"
          >
            <CornerTicks />
            <NodeGraphSVG />
            <div className="relative z-10">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.35em] uppercase text-cyan-glow/80">
                <span className="size-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_rgba(57,255,138,0.8)]" />
                ACTIVE NODE · 0x01
              </div>
              <h3 className="mt-5 font-display font-semibold text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight">
                <DecryptText text="nest2move" stagger={24} cipherDuration={400} />
                <span className="text-cyan-glow/70"> / </span>
                <DecryptText text="pro2move" stagger={24} cipherDuration={400} />
              </h3>
              <p className="mt-3 text-bone/70 text-sm md:text-base max-w-xl leading-relaxed">
                Software Development Intern — building features for the
                <span className="text-cyan-glow"> pro2move</span> platform; integrating
                application code with secure cloud primitives.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/50">
                <span className="size-1 rounded-full bg-cyan-glow" />
                STATUS: HANDSHAKE_OK · LATENCY 12ms
              </div>
            </div>
          </motion.div>

          {/* EDUCATION node */}
          <motion.div
            variants={card} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={1}
            className="col-span-12 md:col-span-5 row-span-3 glass rounded-md p-7 relative overflow-hidden group"
            data-cursor="hover"
          >
            <CornerTicks />
            <div className="relative z-10">
              <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-cyan-glow/80">
                NODE · 0x02 · EDU
              </div>
              <h3 className="mt-5 font-display font-semibold text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight">
                <DecryptText text="Software Development" stagger={20} cipherDuration={400} />
              </h3>
              <p className="mt-3 text-bone/70 text-sm leading-relaxed">
                Specialization in secure systems, cloud-native architecture and
                research on Zero Trust automation.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Stat label="GRADUATION" value="FEB 2027" />
                <Stat label="FOCUS" value="ZTA / SOAR" />
              </div>
            </div>
          </motion.div>

          {/* THESIS / FOCUS strip */}
          <motion.div
            variants={card} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={2}
            className="col-span-12 md:col-span-7 row-span-3 glass rounded-md p-7 relative overflow-hidden"
            data-cursor="hover"
          >
            <CornerTicks />
            <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-cyan-glow/80">
              NODE · 0x03 · RESEARCH
            </div>
            <h3 className="mt-5 font-display font-semibold text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight">
              <DecryptText
                text="MTTR Reduction · Azure IaaS"
                stagger={22}
                cipherDuration={450}
              />
            </h3>
            <p className="mt-3 text-bone/70 text-sm leading-relaxed max-w-xl">
              Empirical pipeline: KQL detections → Sentinel incidents → Logic-App
              SOAR playbooks → automated containment, with controlled latency
              measurements across attack stages.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["NIST 800-207", "SOAR", "MITRE ATT&CK", "Defender XDR"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-[0.2em] uppercase
                                          border border-cyan-glow/20 text-bone/70">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* STACK / SKILL TAGS */}
          <motion.div
            variants={card} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={3}
            className="col-span-12 md:col-span-5 row-span-3 glass rounded-md p-7 relative overflow-hidden"
          >
            <CornerTicks />
            <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-cyan-glow/80 mb-5">
              NODE · 0x04 · STACK
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((s, idx) => (
                <SkillTag key={s} label={s} i={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- atoms ----------------- */

function CornerTicks() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-cyan-glow/60" />
      <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-cyan-glow/60" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-cyan-glow/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-cyan-glow/60" />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-cyan-glow/20 p-3">
      <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-bone/50">{label}</div>
      <div className="mt-1 font-mono text-cyan-glow text-sm tracking-wider">{value}</div>
    </div>
  );
}

/**
 * NODE GRAPH (SVG) — sits behind the primary card. Cheap, pretty, signals "graph".
 * Animates a pulse traveling along each edge with offset stagger.
 */
function NodeGraphSVG() {
  // hand-tuned topology
  const nodes: { x: number; y: number; r?: number }[] = [
    { x: 60,  y: 80,  r: 5 },   // 0
    { x: 180, y: 50,  r: 4 },   // 1
    { x: 280, y: 120, r: 6 },   // 2 (hub)
    { x: 380, y: 70,  r: 4 },   // 3
    { x: 470, y: 150, r: 4 },   // 4
    { x: 130, y: 200, r: 4 },   // 5
    { x: 260, y: 240, r: 5 },   // 6 (hub)
    { x: 400, y: 230, r: 4 },   // 7
    { x: 510, y: 280, r: 4 }    // 8
  ];
  const edges: [number, number][] = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[5,6],[6,2],[6,7],[7,4],[7,8],[2,6]
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-70 transition-opacity duration-700"
      viewBox="0 0 560 320"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="node-gloss" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00ffd5" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ffd5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => {
        const A = nodes[a], B = nodes[b];
        return (
          <g key={i}>
            <line
              x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke="rgba(0,255,213,0.25)" strokeWidth={1}
            />
            {/* travelling pulse */}
            <circle r={2.2} fill="#00ffd5">
              <animateMotion
                dur={`${2.4 + (i % 4) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 3}s`}
                path={`M${A.x},${A.y} L${B.x},${B.y}`}
              />
            </circle>
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={(n.r ?? 4) + 6} fill="url(#node-gloss)" opacity={0.35} />
          <circle cx={n.x} cy={n.y} r={n.r ?? 4} fill="#00ffd5" />
        </g>
      ))}
    </svg>
  );
}
