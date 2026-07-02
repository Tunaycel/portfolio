"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

type Props = {
  label: string;
  /** floating drift index (used to phase-shift the floaty animation) */
  i?: number;
};

/**
 * SKILL TAG
 * - Idle: gentle float (sine bob) with phase per-tag
 * - Hover: 3D tilt driven by mouse (perspective + rotateX/Y)
 * - Glare: a radial gradient that follows the cursor across the chip
 *   (pure CSS radial-gradient with --x/--y motion values)
 */
export function SkillTag({ label, i = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]),  { stiffness: 220, damping: 18 });

  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                 glass cursor-none select-none"
      style={{
        transformStyle: "preserve-3d",
        rotateX: rx,
        rotateY: ry,
        perspective: 600
      }}
      animate={{
        // floating drift — phase-shifted per tag
        y: [0, -4, 0, 4, 0],
        rotate: [0, 0.6, 0, -0.6, 0]
      }}
      transition={{
        duration: 6 + (i % 5) * 0.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.12
      }}
    >
      {/* glare layer */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY] as any,
            ([x, y]: [string, string]) =>
              `radial-gradient(180px circle at ${x} ${y}, rgba(0,255,213,0.35), rgba(0,255,213,0) 60%)`
          )
        }}
      />
      {/* edge glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-glow/30 group-hover:ring-cyan-glow/70 transition-colors duration-300" />

      <span className="size-1.5 rounded-full bg-cyan-glow shadow-[0_0_8px_rgba(0,255,213,0.8)]" />
      <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-bone/90">
        {label}
      </span>
    </motion.div>
  );
}
