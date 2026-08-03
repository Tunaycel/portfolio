"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(100);
      setDone(true);
      onComplete();
      return;
    }
    const duration = 2100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out so the counter lands softly on 100
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-end justify-between bg-ink px-6 pb-6 md:px-12 md:pb-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-smoke">
            <span className="clip-line">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              >
                Hüseyin Tunay Çelik — Portfolio, Vol. II
              </motion.span>
            </span>
          </div>
          <div
            className="font-serif text-[18vw] leading-none text-bone md:text-[10rem]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {count}
            <span className="text-ember">.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
