"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DecryptText } from "@/components/DecryptText";

const metrics = [
  { kpi: "≥ 60%", label: "MTTR REDUCTION", sub: "Mean Time To Respond — automated triage + remediation" },
  { kpi: "≥ 95%", label: "DETECTION ACCURACY", sub: "True-positive rate across multi-stage Sentinel analytics" },
  { kpi: "Azure", label: "IaaS PERIMETER", sub: "VMs · NSG · Conditional Access · Logic Apps" },
  { kpi: "800-207", label: "NIST FRAMEWORK", sub: "Zero Trust Architecture — empirical evaluation" }
];

export function ThesisSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // background grid pan
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.55, 0.2]);

  return (
    <section ref={ref} id="thesis" className="relative py-32 md:py-48 px-6 md:px-12">
      {/* animated grid bg */}
      <motion.div
        style={{ y: gridY, opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 grid-bg"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,213,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8 font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-glow/80">
          <span className="size-1.5 rounded-full bg-cyan-glow animate-pulse" />
          <span>02 · RESEARCH</span>
          <span className="flex-1 h-px bg-cyan-glow/20 ml-4" />
        </div>

        <h2 className="font-display font-semibold leading-[1.05] tracking-tight text-bone
                       text-[clamp(2rem,5.6vw,4.4rem)]">
          <DecryptText
            text="Automated Incident Response"
            stagger={22}
            cipherDuration={500}
          />
          <br />
          <span className="text-glow-cyan">
            <DecryptText
              text="under Zero Trust Architecture."
              stagger={22}
              cipherDuration={500}
            />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-3xl text-bone/70 leading-relaxed text-[15px] md:text-[17px]"
        >
          An empirical evaluation of <span className="text-cyan-glow">MTTR reduction</span> in
          Microsoft Azure IaaS — instrumenting Sentinel, KQL detections, Logic-App SOAR
          playbooks, and Conditional Access guardrails to quantify how policy-driven
          automation outpaces analyst toil.
        </motion.p>

        {/* metric grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <Metric key={i} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ kpi, label, sub, index }: { kpi: string; label: string; sub: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative p-6 md:p-8 rounded-md overflow-hidden group"
    >
      {/* corner ticks */}
      <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-cyan-glow/60" />
      <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-cyan-glow/60" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-cyan-glow/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-cyan-glow/60" />

      {/* shimmer on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                       transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]
                       bg-gradient-to-r from-transparent via-cyan-glow/10 to-transparent" />

      <div className="font-display font-bold text-[clamp(2.6rem,5vw,4.5rem)] leading-none text-glow-cyan">
        <DecryptText text={kpi} stagger={20} cipherDuration={400} />
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-[0.35em] uppercase text-cyan-glow/80">
        {label}
      </div>
      <p className="mt-3 text-bone/60 text-sm leading-relaxed">{sub}</p>
    </motion.div>
  );
}
