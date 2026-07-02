"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HEX = "0123456789ABCDEF";
const SYMBOLS = "!@#$%^&*<>{}[]/\\|=+~?";
const CRYPTO_POOL = (HEX + SYMBOLS).split("");

function randomChar(seed?: number) {
  return CRYPTO_POOL[Math.floor(Math.random() * CRYPTO_POOL.length)];
}

type Props = {
  text: string;
  /** ms per character once decryption starts on this letter */
  cipherDuration?: number;
  /** ms stagger between adjacent letters starting to settle */
  stagger?: number;
  className?: string;
  /** trigger on scroll into view (default true) */
  triggerOnView?: boolean;
};

/**
 * DECRYPT TEXT
 * - On enter, every char is replaced with a random hex/symbol glyph
 * - A "wavefront" sweeps left → right; chars behind the front lock in
 *   to their real character. Chars ahead keep scrambling.
 * - Implemented with a single rAF loop driven by a normalized progress
 *   value, so we don't spawn N timers.
 */
export function DecryptText({
  text,
  cipherDuration = 600,
  stagger = 28,
  className,
  triggerOnView = true
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    if (!started) {
      // fill with cipher initially
      setDisplay(text.split("").map((c) => (c === " " ? " " : randomChar())).join(""));
    }
    if (triggerOnView ? inView : true) {
      setStarted(true);
    }
  }, [inView, started, text, reduce, triggerOnView]);

  useEffect(() => {
    if (!started || reduce) return;
    const start = performance.now();
    const totalDuration = cipherDuration + stagger * text.length;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / totalDuration);
      const out: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") { out.push(" "); continue; }
        // each letter starts at i*stagger, completes after cipherDuration
        const localStart = (i * stagger) / totalDuration;
        const localEnd = (i * stagger + cipherDuration) / totalDuration;
        if (t >= localEnd) {
          out.push(ch);
        } else if (t >= localStart) {
          out.push(randomChar());
        } else {
          out.push(randomChar());
        }
      }
      setDisplay(out.join(""));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, text, cipherDuration, stagger, reduce]);

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label={text}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span aria-hidden>{display}</span>
    </motion.span>
  );
}
