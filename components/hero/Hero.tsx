"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticText } from "@/components/MagneticText";

// keep R3F out of SSR
const ParticleNetwork = dynamic(
  () => import("./ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false }
);

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

export function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* webgl */}
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_85%)]" />

      {/* HUD top bar */}
      <div className="absolute top-0 inset-x-0 px-6 md:px-12 py-6 flex items-center justify-between text-[11px] tracking-[0.3em] uppercase text-cyan-glow/80 font-mono z-10">
        <motion.span variants={reveal} initial="hidden" animate="show" custom={0}>
          ◉ ZTA / SESSION:VERIFIED
        </motion.span>
        <motion.span variants={reveal} initial="hidden" animate="show" custom={1} className="hidden md:inline">
          NEVER&nbsp;TRUST&nbsp;·&nbsp;ALWAYS&nbsp;VERIFY
        </motion.span>
        <motion.span variants={reveal} initial="hidden" animate="show" custom={2}>
          NIST&nbsp;SP&nbsp;800-207
        </motion.span>
      </div>

      {/* center stack */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          variants={reveal} initial="hidden" animate="show" custom={3}
          className="text-cyan-glow/80 font-mono text-[11px] md:text-xs tracking-[0.45em] uppercase mb-6"
        >
          CLOUD SECURITY ENGINEER&nbsp;&nbsp;//&nbsp;&nbsp;SOFTWARE DEVELOPER
        </motion.p>

        <motion.h1
          variants={reveal} initial="hidden" animate="show" custom={4}
          className="font-display font-bold leading-[0.95] tracking-tight text-bone
                     text-[clamp(2.6rem,9vw,8.5rem)]"
        >
          <MagneticText text="Hüseyin Tunay" />
          <br />
          <span className="text-glow-cyan">
            <MagneticText text="Çelik" />
          </span>
        </motion.h1>

        <motion.p
          variants={reveal} initial="hidden" animate="show" custom={6}
          className="mt-8 max-w-2xl text-bone/70 text-sm md:text-base leading-relaxed"
        >
          Building automated incident response under{" "}
          <span className="text-cyan-glow">Zero Trust Architecture</span> in
          Microsoft Azure IaaS — measuring how policy-driven automation
          collapses MTTR.
        </motion.p>

        <motion.div
          variants={reveal} initial="hidden" animate="show" custom={8}
          className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-ash"
        >
          <span className="size-1.5 rounded-full bg-neon-green animate-pulse" />
          MOVE&nbsp;THE&nbsp;CURSOR&nbsp;—&nbsp;SCAN&nbsp;THE&nbsp;FABRIC
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-glow/70 font-mono text-[10px] tracking-[0.4em] uppercase"
      >
        <div className="flex flex-col items-center gap-2">
          SCROLL&nbsp;↓
          <span className="block w-px h-10 bg-gradient-to-b from-cyan-glow/80 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
