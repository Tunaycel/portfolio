"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

/**
 * MAGNETIC TEXT
 * The text container tracks mouse offset within its bounds and translates
 * with a critically-damped spring. Each letter additionally lerps with a
 * delayed weight so the title "ripples" toward the cursor.
 */

type Props = {
  text: string;
  className?: string;
  /** how far the whole block can travel (px) */
  pull?: number;
  /** per-letter additional offset (px) */
  letterPull?: number;
};

export function MagneticText({ text, className = "", pull = 28, letterPull = 8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring: stiffness 240, damping 22, mass 0.6 → snappy but smooth
  const sx = useSpring(mx, { stiffness: 240, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 240, damping: 22, mass: 0.6 });

  const handleMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    mx.set(Math.max(-1, Math.min(1, dx)) * pull);
    my.set(Math.max(-1, Math.min(1, dy)) * pull);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      data-magnetic
      className={`inline-block will-change-transform ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {text.split("").map((ch, i) => (
        <Letter
          key={i}
          char={ch}
          index={i}
          total={text.length}
          mx={mx}
          my={my}
          letterPull={letterPull}
        />
      ))}
    </motion.span>
  );
}

function Letter({
  char,
  index,
  total,
  mx,
  my,
  letterPull
}: {
  char: string;
  index: number;
  total: number;
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
  letterPull: number;
}) {
  // each letter has a phase 0..1 across the word — gives a wave feel
  const phase = total > 1 ? index / (total - 1) : 0;
  // weight is largest in the middle, smaller at the edges (sine bell)
  const weight = Math.sin(phase * Math.PI); // 0..1..0

  const lx = useTransform(mx, (v) => v * weight * (letterPull / 14));
  const ly = useTransform(my, (v) => v * weight * (letterPull / 14));

  const lsx = useSpring(lx, { stiffness: 220, damping: 24, mass: 0.5 });
  const lsy = useSpring(ly, { stiffness: 220, damping: 24, mass: 0.5 });

  if (char === " ") return <span>&nbsp;</span>;

  return (
    <motion.span className="inline-block" style={{ x: lsx, y: lsy }}>
      {char}
    </motion.span>
  );
}
