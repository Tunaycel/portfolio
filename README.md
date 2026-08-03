# Portfolio — Hüseyin Tunay Çelik

A personal site built as one continuous descent: a single fixed WebGL world sits behind the
whole page, and scrolling flies the camera through it along a fixed rail. The text is
ordinary DOM floating on top; the world underneath is what moves.

Next.js 14 (App Router) · React Three Fiber · Framer Motion · Tailwind · Lenis

---

## How it works

**One scroll value drives everything.** `useScroll()` produces a single `MotionValue` that is
passed into the 3D scene. There is no per-section scroll listener and no `ScrollTrigger`.

**`Rig.tsx`** samples a `CatmullRomCurve3` rail at that progress value and moves the camera
there, then looks at a point 5% further along the curve so the camera always leans into the
turn. Both the position and the look-at target are damped rather than set directly:

```ts
const k = damp(4.5, delta);          // 1 - exp(-lambda * dt)
cam.position.lerp(targetPos, k);
```

The damping coefficient is exponential in `delta`, so the smoothing is frame-rate independent
— the same motion on a 60 Hz and a 144 Hz display. Pointer position adds a small sway
(`x * 0.55`, `y * 0.35`) on top of the rail so the world has parallax even when scroll is
still.

**The scene** is composed of independent layers, each a self-contained component:
`Stars` · `Tunnel` · `Slabs` · `Core` · `Cluster` · `Shards`. Only `Shards` and `Rig` read
scroll progress; the rest animate on their own clock, which keeps the scroll path cheap.
A single unlit sphere plus a point light at `SIGNAL` marks the end of the rail — the one
thing you're descending toward.

**Post-processing** is bloom (threshold 0.28, mipmap blur) and a vignette. Antialiasing is
off and DPR is capped at 1.5, since bloom hides the aliasing and fillrate is the real budget
at this particle count.

## Layout

```
app/
  page.tsx        Five chapters over the fixed canvas: hero, manifesto, work, thesis, projects, contact
  layout.tsx      Fraunces (serif) + JetBrains Mono, cursor, smooth scroll
  globals.css     Palette, grain, reduced-motion overrides

components/
  three/
    Experience.tsx  Canvas, lights, fog, post-processing
    Rig.tsx         Scroll → camera position along the rail
    path.ts         The rail curve and the damping helper
    Shards.tsx      Scroll-reactive geometry
    Tunnel · Slabs · Core · Cluster · Stars
  Preloader.tsx   Counter, then hands off with onComplete
  Reveal.tsx      Line and per-character reveals
  Header.tsx · Cursor.tsx · Magnetic.tsx · Grain.tsx · SmoothScroll.tsx
```

## Palette and type

Ink `#0B0A08` · bone `#EBE5DA` · smoke `#8A8478` · one accent, ember `#E5330C`.
Fraunces variable serif for display, JetBrains Mono for labels. The accent appears only on
things you can act on or the one point in the 3D scene you are heading toward.

## Reduced motion

`Preloader` and `Reveal` both check `useReducedMotion()` and render their final state
immediately instead of animating in. `globals.css` collapses the remaining CSS transitions.
The 3D world still renders, but nothing animates uninvited.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Type-check: `npx tsc --noEmit`.
