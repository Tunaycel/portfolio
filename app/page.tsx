"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Magnetic } from "@/components/Magnetic";
import { RevealBlock, RevealChars, RevealLine } from "@/components/Reveal";

const Experience = dynamic(
  () => import("@/components/three/Experience").then((m) => m.Experience),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/* DOM chapter block — text floating over the 3D void                  */
/* ------------------------------------------------------------------ */

function Chapter({
  id,
  kicker,
  title,
  children,
  align = "left",
  height = "130svh"
}: {
  id?: string;
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "right" | "center";
  height?: string;
}) {
  const alignCls =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";
  return (
    <section
      id={id}
      style={{ minHeight: height }}
      className={`pointer-events-none relative flex flex-col justify-center px-6 md:px-16 ${alignCls}`}
    >
      <RevealBlock>
        <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.4em] text-ember">
          {kicker}
        </div>
      </RevealBlock>
      <h2 className="max-w-3xl font-serif text-4xl font-black leading-[1.02] tracking-[-0.02em] md:text-6xl">
        {title}
      </h2>
      {children && (
        <RevealBlock delay={0.15} className="mt-6 max-w-md">
          {children}
        </RevealBlock>
      )}
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Page() {
  const [started, setStarted] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <div id="top">
      <Preloader onComplete={() => setStarted(true)} />
      <Header started={started} />

      {/* the world */}
      {started && <Experience progress={scrollYProgress} />}
      {/* readability scrim, bottom-weighted */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-ink/60" />

      <main className="relative z-10">
        {/* 00 — HERO */}
        <section className="pointer-events-none relative flex min-h-[110svh] flex-col justify-between px-6 pb-10 pt-28 md:px-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-smoke">
            {started && (
              <RevealLine delay={0.2}>
                A journey in five chapters — Wrocław, MMXXVI
              </RevealLine>
            )}
          </div>
          <div>
            {started && (
              <h1 className="font-serif font-black leading-[0.86] tracking-[-0.03em]">
                <span className="block text-[15vw] md:text-[10.5vw]">
                  <RevealChars text="TUNAY" delay={0.1} />
                </span>
                <span className="text-outline block text-[15vw] md:text-[10.5vw]">
                  <RevealChars text="ÇELİK" delay={0.3} />
                </span>
              </h1>
            )}
            {started && (
              <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <RevealLine
                  delay={0.7}
                  className="max-w-md text-lg leading-relaxed text-bone/80"
                >
                  <span>
                    Software developer & cloud-security researcher. This site is
                    one continuous descent — <em className="text-ember">scroll</em>{" "}
                    and the world moves with you.
                  </span>
                </RevealLine>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-smoke"
                >
                  Begin descent
                  <motion.span
                    animate={{ y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="inline-block h-4 w-px bg-ember"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* 01 — MANIFESTO (the monolith shatters here) */}
        <Chapter
          kicker="01 — Manifesto"
          height="150svh"
          align="center"
          title={
            <>
              Trust nothing.
              <br />
              <em className="text-ember">Verify</em> everything.
            </>
          }
        >
          <p className="leading-relaxed text-bone/70">
            The discipline of Zero Trust, applied to software itself — every
            layer questioned, every pixel earned. What just shattered around
            you will be rebuilt. Keep going.
          </p>
        </Chapter>

        {/* 02 — WORK I */}
        <Chapter
          id="work"
          kicker="02 — Now"
          align="right"
          title={
            <>
              ANTIGRAVITY
              <span className="block font-serif text-2xl font-normal italic text-bone/80 md:text-3xl">
                EmlakPlus AI — Software Developer
              </span>
            </>
          }
        >
          <p className="leading-relaxed text-bone/70">
            Building the interface of an AI-powered real-estate SaaS — listing
            intelligence, valuation flows and the dashboards agents live in.
          </p>
          <Tags items={["React", "Next.js", "TypeScript", "Tailwind", "AI / RAG"]} />
        </Chapter>

        {/* 03 — WORK II */}
        <Chapter
          kicker="03 — Foundation"
          title={
            <>
              NEST2MOVE
              <span className="block font-serif text-2xl font-normal italic text-bone/80 md:text-3xl">
                Software Engineering Intern
              </span>
            </>
          }
        >
          <p className="leading-relaxed text-bone/70">
            First contact with production: shipping full-stack features under
            real deadlines, for real users.
          </p>
          <Tags items={["Full-stack", "Production", "Teamwork"]} />
        </Chapter>

        {/* 04 — THESIS (debris converges into the core) */}
        <Chapter
          id="thesis"
          kicker="04 — Thesis"
          align="center"
          height="170svh"
          title={
            <>
              THE ZERO TRUST CORE
              <span className="block font-serif text-2xl font-normal italic text-bone/80 md:text-3xl">
                B.Sc. — WSB Merito University, Wrocław
              </span>
            </>
          }
        >
          <p className="leading-relaxed text-bone/70">
            The shattered monolith re-assembles: a Zero Trust Architecture in
            the cloud with automated incident response on Azure — identity
            verified at every hop, alerts that fix themselves before a human
            reads them.
          </p>
          <Tags items={["Azure Sentinel", "ZTA", "SOAR", "Cloud Security"]} />
        </Chapter>

        {/* 05 — PROJECTS */}
        <section
          id="projects"
          style={{ minHeight: "150svh" }}
          className="pointer-events-none relative flex flex-col justify-center px-6 md:px-16"
        >
          <RevealBlock>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.4em] text-ember">
              05 — Artefacts
            </div>
          </RevealBlock>
          <h2 className="font-serif text-4xl font-black leading-[1.02] tracking-[-0.02em] md:text-6xl">
            SELECTED WORK
          </h2>
          <div className="pointer-events-auto mt-10 max-w-2xl">
            {[
              {
                name: "EmlakPlus AI",
                kind: "AI real-estate SaaS — frontend",
                href: null
              },
              {
                name: "Zero Trust Lab",
                kind: "Thesis implementation on Azure",
                href: null
              },
              {
                name: "CVForge",
                kind: "CV builder",
                href: "https://github.com/Tunaycel"
              },
              {
                name: "This site",
                kind: "Next.js + R3F — the void you are in",
                href: "https://github.com/Tunaycel/portfolio"
              }
            ].map((p, i) => {
              const row = (
                <div className="rule-top group flex items-baseline justify-between gap-6 py-6 transition-colors duration-500 hover:bg-bone/5">
                  <span className="font-serif text-2xl font-black transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-4xl">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                    {p.kind} {p.href && <span className="text-ember">↗</span>}
                  </span>
                </div>
              );
              return (
                <RevealBlock key={p.name} delay={i * 0.08}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="block">
                      {row}
                    </a>
                  ) : (
                    row
                  )}
                </RevealBlock>
              );
            })}
            <div className="rule-top" />
          </div>
        </section>

        {/* 06 — RECORDS */}
        <Chapter
          kicker="06 — Records"
          align="right"
          height="110svh"
          title={<>CREDENTIALS</>}
        >
          <div className="flex flex-col gap-4 text-bone/70">
            <div>
              <span className="text-bone">WSB Merito University, Wrocław</span>
              <br />
              B.Sc. — thesis on Zero Trust & automated incident response
            </div>
            <div>
              <span className="text-bone">Oracle Cloud Infrastructure</span>
              <br />
              OCI Certified, 2025
            </div>
          </div>
        </Chapter>

        {/* 07 — CONTACT (the lone signal) */}
        <section
          id="contact"
          style={{ minHeight: "120svh" }}
          className="pointer-events-none relative flex flex-col items-center justify-center px-6 text-center"
        >
          <RevealBlock>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-ember">
              07 — End of the line
            </div>
          </RevealBlock>
          <h2 className="font-serif font-black leading-[0.9] tracking-[-0.03em]">
            <span className="block text-[13vw] md:text-[8vw]">
              <RevealChars text="SAY HELLO" stagger={0.04} />
            </span>
          </h2>
          <div className="pointer-events-auto mt-12">
            <Magnetic>
              <a
                href="mailto:h.tunaycelik@gmail.com"
                className="group inline-flex items-center gap-4 border border-bone/25 bg-ink/40 px-8 py-5 font-mono text-xs uppercase tracking-[0.35em] backdrop-blur-sm transition-colors duration-500 hover:border-ember hover:text-ember"
              >
                h.tunaycelik@gmail.com
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  →
                </span>
              </a>
            </Magnetic>
          </div>
          <footer className="pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 py-8 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke md:flex-row md:items-center md:justify-between md:px-16">
            <div>Hüseyin Tunay Çelik — Wrocław</div>
            <a
              href="https://github.com/Tunaycel"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-ember"
            >
              GitHub — Tunaycel
            </a>
            <div>© {new Date().getFullYear()}</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
