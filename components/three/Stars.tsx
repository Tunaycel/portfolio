"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { mulberry32 } from "./path";

const COUNT = 4500;

/** Dust field wrapping the whole rail — gives the void scale and parallax. */
export function Stars() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const rng = mulberry32(7071);
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rng() - 0.5) * 70;
      positions[i * 3 + 1] = (rng() - 0.5) * 40;
      positions[i * 3 + 2] = 20 - rng() * 120;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color="#cfc9bd"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
