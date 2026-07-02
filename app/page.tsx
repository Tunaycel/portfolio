"use client";

import { useState } from "react";
import { Hero } from "@/components/hero/Hero";
import { ThesisSection } from "@/components/thesis/ThesisSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { BootSequence } from "@/components/BootSequence";
import { motion } from "framer-motion";

export default function Page() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <Hero />
        <ThesisSection />
        <ExperienceSection />
        <Footer />
      </motion.main>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 border-t border-cyan-glow/15">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-cyan-glow/70 mb-4">
            // END OF SESSION
          </div>
          <h3 className="font-display font-semibold text-3xl md:text-5xl leading-tight">
            Verify the next signal.
          </h3>
          <a
            href="mailto:h.tunaycelik@gmail.com"
            data-cursor="hover"
            className="inline-block mt-6 font-mono text-cyan-glow text-glow-cyan
                       text-lg tracking-wider border-b border-cyan-glow/40 hover:border-cyan-glow"
          >
            h.tunaycelik@gmail.com →
          </a>
        </div>
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-bone/40 space-y-1">
          <div>HÜSEYIN TUNAY ÇELIK</div>
          <div>CLOUD SECURITY · SOFTWARE</div>
          <div>© {new Date().getFullYear()} · ZTA / 0xFE</div>
        </div>
      </div>
    </footer>
  );
}
