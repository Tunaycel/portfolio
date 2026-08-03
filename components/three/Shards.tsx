"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { CORE, ZONES, mulberry32, scatterAround, smoothstep } from "./path";

const COUNT = 420;

type ShardData = {
  a: THREE.Vector3; // monolith formation
  b: THREE.Vector3; // corridor debris
  c: THREE.Vector3; // zero-trust shell
  rot: THREE.Euler;
  spin: THREE.Vector3;
  scale: number;
};

/**
 * One entity, three lives: a monolith that shatters into corridor debris,
 * then re-assembles as the Zero Trust core shell.
 */
export function Shards({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const shards = useMemo<ShardData[]>(() => {
    const rng = mulberry32(20260704);
    const m = ZONES.monolith;
    return Array.from({ length: COUNT }, () => {
      // A — packed inside a tall monolith slab
      const a = new THREE.Vector3(
        m.x + (rng() - 0.5) * 1.6,
        m.y + (rng() - 0.5) * 4.2,
        m.z + (rng() - 0.5) * 0.9
      );
      // B — debris scattered around the flight corridor
      const b = scatterAround(0.15 + rng() * 0.4, 2.4, 5.5, rng);
      // C — shell around the core
      const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
      const c = CORE.clone().add(dir.multiplyScalar(2.4 + rng() * 0.15));
      return {
        a,
        b,
        c,
        rot: new THREE.Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI),
        spin: new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).multiplyScalar(0.6),
        scale: 0.07 + rng() * 0.16
      };
    });
  }, []);

  const pos = useMemo(() => new THREE.Vector3(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const im = mesh.current;
    if (!im) return;
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1);
    const t1 = smoothstep(ZONES.explodeStart, ZONES.explodeEnd, p);
    const t2 = smoothstep(ZONES.convergeStart, ZONES.convergeEnd, p);
    const time = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const s = shards[i];
      pos.copy(s.a).lerp(s.b, t1);
      pos.lerp(s.c, t2);
      // idle breathing while in debris form, frozen once locked into the shell
      const drift = (1 - t2) * 0.12;
      tmp.set(
        Math.sin(time * 0.4 + i) * drift,
        Math.cos(time * 0.3 + i * 1.7) * drift,
        Math.sin(time * 0.25 + i * 0.6) * drift
      );
      pos.add(tmp);

      dummy.position.copy(pos);
      const spin = (1 - t2) * time;
      dummy.rotation.set(
        s.rot.x + s.spin.x * spin,
        s.rot.y + s.spin.y * spin,
        s.rot.z + s.spin.z * spin
      );
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    }
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#171310"
        metalness={0.9}
        roughness={0.28}
        flatShading
      />
    </instancedMesh>
  );
}
