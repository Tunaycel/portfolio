# Zero Trust Portfolio

> "Never Trust, Always Verify" — a personal portfolio for Hüseyin Tunay Çelik,
> built as a cinematic Zero Trust Architecture experience.

## Stack
- **Next.js 14** (App Router, RSC + client components where needed)
- **React Three Fiber + Three.js** — interactive WebGL hero (custom GLSL shader)
- **Framer Motion** — orchestrated transitions, magnetic text, decryption rAF
- **Lenis** — buttery smooth scrolling with expo-out easing
- **Tailwind CSS** — neon palette, glassmorphism, scanlines

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

## What's where

```
app/
  layout.tsx           Root layout — fonts, cursor, smooth scroll
  page.tsx             Orchestrator (Boot → Hero → Thesis → Experience → Footer)
  globals.css          Cyber utilities (glass, scanline, glitch, custom cursor)

components/
  BootSequence.tsx     Terminal typing → 48-shard glass shatter
  SmoothScroll.tsx     Lenis provider
  Cursor.tsx           Custom reticle with lerp follow + hover swell
  MagneticText.tsx     Magnetic title (container spring + per-letter sine bell)
  DecryptText.tsx      Hash → plaintext scrambler (rAF, single-loop)

  hero/
    Hero.tsx
    ParticleNetwork.tsx  R3F point cloud + custom shader (mouse scanner)

  thesis/
    ThesisSection.tsx    Scroll-bound section, KPI bento

  experience/
    ExperienceSection.tsx  Bento + animated SVG node graph
    SkillTag.tsx           3D-tilt holographic chip with mouse-tracked glare
```

## Key technical highlights

### 1. The Boot Sequence
A timed array of typed terminal lines drives `setTimeout`-based progressive reveal.
On completion, the screen splits into a **6×8 grid of glass shards**, each shard
flying outward with a deterministic vector `(c - mid, r - mid)` plus jitter,
eased with `cubicBezier(0.16, 1, 0.3, 1)`. An RGB-split flash punctuates the cut.

### 2. Hero — particle network
- 4500 particles distributed via **Fibonacci sphere** (golden-ratio `φπ`).
- Each frame projects the mouse pointer onto the camera's `z=0` plane and lerps
  a `uScanner` uniform with critically-damped damping `1 - 0.001^dt`.
- Vertex shader passes a `vScan = 1 - smoothstep(0, R, distance(pos, uScanner))`
  varying, fragment shader mixes `threat-red → verified-cyan` accordingly,
  with additive blending for a true neon glow.
- 220 sparse line edges + 80 brighter "core nodes" reinforce the graph metaphor.

### 3. Decryption text
Single rAF loop reads global progress `t ∈ [0,1]` and decides per character:
`t ≥ (i*stagger + cipherDuration)/total → settle`, otherwise sample a random
glyph from `[0-9A-F!@#$%…]`. No N-timer fanout, GC-friendly.

### 4. Magnetic typography
Two layers of springs:
- Outer container tracks normalized cursor offset and translates up to `pull` px.
- Each letter applies an additional `sin(πi/(N-1))` weight so the middle of the
  word ripples more than the edges.

### 5. Skill tags
- Idle: phase-shifted vertical bob keyframes per index.
- Hover: `rotateX/Y` from the same normalized cursor coords (perspective 600).
- Glare: a `radial-gradient` whose center comes from `useTransform([mx, my])` —
  the gloss literally tracks the mouse.

## Reduced motion

Every animation respects `prefers-reduced-motion`:
- Boot sequence skips and reveals immediately.
- Decryption renders plaintext directly.
- Particle drift continues (gentle) — but no scanner spike behavior is required.

## Notes

- For best perf: keep the page on a discrete GPU during dev — the shader is
  cheap but DPR=2 + 4500 points uses real fillrate.
