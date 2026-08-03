"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Thesis", href: "#thesis" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export function Header({ started }: { started: boolean }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={started ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      className="fixed inset-x-0 top-0 z-[100] mix-blend-difference"
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <a
          href="#top"
          className="font-serif text-xl font-black italic tracking-tight text-bone"
        >
          T.Ç<span className="text-ember">.</span>
        </a>
        <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.3em] text-bone md:gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-opacity duration-300 hover:opacity-50"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
