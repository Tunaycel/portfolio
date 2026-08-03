"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Masked line reveal — the line slides up from behind an overflow-hidden clip. */
export function RevealLine({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`clip-line ${className}`}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Per-character stagger reveal for display headlines. */
export function RevealChars({
  text,
  delay = 0,
  stagger = 0.035,
  className = ""
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className} aria-label={text} role="text">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block">
            &nbsp;
          </span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden
          >
            <motion.span
              className="inline-block"
              initial={reduced ? false : { y: "115%", rotate: 4 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
            >
              {ch}
            </motion.span>
          </span>
        )
      )}
    </span>
  );
}

/** Simple fade-rise for blocks of supporting copy. */
export function RevealBlock({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
