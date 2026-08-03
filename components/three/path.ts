import * as THREE from "three";

/**
 * The spine of the whole experience: one camera rail through the void.
 * Scroll progress 0→1 maps directly onto this curve.
 */
export const RAIL = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0.2, 9),
    new THREE.Vector3(0.8, 0.1, -2),
    new THREE.Vector3(-1.6, -0.4, -12),
    new THREE.Vector3(1.8, 0.5, -22),
    new THREE.Vector3(-1.6, -0.5, -32),
    new THREE.Vector3(1.2, 0.4, -42),
    new THREE.Vector3(-0.8, 0.2, -50),
    new THREE.Vector3(0.9, -0.3, -58),
    new THREE.Vector3(-1.0, 0.3, -66),
    new THREE.Vector3(0.4, 0, -73),
    new THREE.Vector3(0, 0.1, -80)
  ],
  false,
  "catmullrom",
  0.5
);

/** Where the shattered monolith re-assembles into the Zero Trust core. */
export const CORE = RAIL.getPoint(0.62);

/** The lone ember signal waiting at the end of the journey. */
export const SIGNAL = new THREE.Vector3(0, 0.1, -86);

export const ZONES = {
  monolith: new THREE.Vector3(0, 0.2, 2.5),
  tunnel: [0.12, 0.26] as const,
  slabA: 0.3,
  slabB: 0.42,
  cluster: 0.74,
  /** shard morph keyframes on global progress */
  explodeStart: 0.05,
  explodeEnd: 0.16,
  convergeStart: 0.47,
  convergeEnd: 0.6
};

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Framerate-independent damping factor. */
export function damp(lambda: number, delta: number) {
  return 1 - Math.exp(-lambda * delta);
}

/** Point on the rail offset radially, used to scatter debris around the flight path. */
export function scatterAround(p: number, minR: number, maxR: number, rng: () => number) {
  const center = RAIL.getPoint(p);
  const angle = rng() * Math.PI * 2;
  const r = minR + rng() * (maxR - minR);
  return new THREE.Vector3(
    center.x + Math.cos(angle) * r,
    center.y + Math.sin(angle) * r,
    center.z + (rng() - 0.5) * 3
  );
}

/** Deterministic PRNG so the scene is identical on every visit. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
