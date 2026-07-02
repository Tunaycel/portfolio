"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Line = {
  prefix: string;
  text: string;
  color?: string;
  delay: number; // ms before this line starts typing
  speed?: number; // ms per char
};

const LINES: Line[] = [
  { prefix: "$", text: "init --secure --policy=zero-trust",       delay: 200,  speed: 22, color: "text-cyan-glow" },
  { prefix: ">", text: "Initiating secure connection...",         delay: 900,  speed: 18 },
  { prefix: ">", text: "Resolving identity provider [Azure AD]",  delay: 1700, speed: 18 },
  { prefix: ">", text: "Verifying identity... MFA challenge OK",  delay: 2700, speed: 18 },
  { prefix: ">", text: "Evaluating Conditional Access policies",  delay: 3700, speed: 16 },
  { prefix: ">", text: "Policy[device.compliant=true] ✓",          delay: 4500, speed: 14, color: "text-neon-green" },
  { prefix: ">", text: "Policy[location.trusted=verified] ✓",      delay: 5000, speed: 14, color: "text-neon-green" },
  { prefix: ">", text: "Policy[risk.signal=low] ✓",                delay: 5500, speed: 14, color: "text-neon-green" },
  { prefix: ">", text: "Zero Trust handshake established.",       delay: 6100, speed: 18, color: "text-cyan-glow" },
  { prefix: "$", text: "boot --hero",                              delay: 6900, speed: 30, color: "text-cyan-glow" }
];

const TOTAL_DURATION = 7600;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);
  const [shattering, setShattering] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setShattering(true), TOTAL_DURATION);
    const t2 = setTimeout(() => {
      setDone(true);
      onComplete();
    }, TOTAL_DURATION + 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete, reduce]);

  // generate the shatter shard grid (8x6 = 48 shards)
  const shards = useMemo(() => {
    const cols = 8, rows = 6;
    const out: { x: number; y: number; w: number; h: number; dx: number; dy: number; rot: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out.push({
          x: (c / cols) * 100,
          y: (r / rows) * 100,
          w: 100 / cols,
          h: 100 / rows,
          // direction outward from center
          dx: (c - (cols - 1) / 2) * 14 + (Math.random() - 0.5) * 30,
          dy: (r - (rows - 1) / 2) * 14 + (Math.random() - 0.5) * 30,
          rot: (Math.random() - 0.5) * 40
        });
      }
    }
    return out;
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] bg-void grid-bg overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* scanline overlay */}
          <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30
            bg-[repeating-linear-gradient(to_bottom,rgba(0,255,213,0.08)_0_1px,transparent_1px_3px)]" />

          {/* terminal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            animate={shattering ? { opacity: 0, transition: { duration: 0.25 } } : { opacity: 1 }}
          >
            <div className="glass-strong w-full max-w-3xl p-6 md:p-10 rounded-md relative scanline">
              {/* window chrome */}
              <div className="flex items-center gap-2 pb-4 border-b border-cyan-glow/20">
                <span className="size-2.5 rounded-full bg-threat-red/80" />
                <span className="size-2.5 rounded-full bg-cyan-glow/60" />
                <span className="size-2.5 rounded-full bg-neon-green/70" />
                <span className="ml-3 text-xs text-ash tracking-[0.2em] uppercase">
                  /usr/local/zero-trust — secure shell
                </span>
              </div>

              <div className="mt-5 font-mono text-[13px] md:text-[15px] leading-relaxed">
                {LINES.map((l, i) => (
                  <TypedLine key={i} {...l} />
                ))}
                <BlinkingCursor />
              </div>

              {/* progress bar */}
              <div className="mt-6 h-[2px] w-full bg-cyan-glow/10 overflow-hidden rounded">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-glow via-neon-green to-cyan-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: TOTAL_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </div>
          </motion.div>

          {/* SHATTER LAYER */}
          {shattering && (
            <div className="absolute inset-0">
              {shards.map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute glass-strong"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.w}%`,
                    height: `${s.h}%`,
                    boxShadow: "0 0 30px rgba(0,255,213,0.25) inset"
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }}
                  animate={{
                    x: `${s.dx}vw`,
                    y: `${s.dy}vh`,
                    rotate: s.rot,
                    opacity: 0,
                    filter: "blur(6px)"
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.004
                  }}
                />
              ))}
              {/* RGB split flash */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, times: [0, 0.2, 1] }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,45,85,0.5), transparent 30%, transparent 70%, rgba(0,255,213,0.5))",
                  mixBlendMode: "screen"
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypedLine({ prefix, text, color, delay, speed = 18 }: Line) {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), speed);
    return () => clearTimeout(t);
  }, [started, shown, text, speed]);

  if (!started) return null;

  return (
    <div className="flex gap-2">
      <span className="text-cyan-glow/70 select-none">{prefix}</span>
      <span className={color ?? "text-bone/90"}>{text.slice(0, shown)}</span>
    </div>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 ml-1 bg-cyan-glow align-middle"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}
