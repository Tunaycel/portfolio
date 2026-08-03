"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RAIL, ZONES } from "./path";

const RING_COUNT = 14;
const Z_AXIS = new THREE.Vector3(0, 0, 1);

/** Faint rings threaded onto the rail — the descent corridor. */
export function Tunnel() {
  const group = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const [start, end] = ZONES.tunnel;
    return Array.from({ length: RING_COUNT }, (_, i) => {
      const p = start + (i / (RING_COUNT - 1)) * (end - start);
      const position = RAIL.getPoint(p);
      const tangent = RAIL.getTangent(p);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(Z_AXIS, tangent);
      return { position, quaternion, phase: i * 0.7 };
    });
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((ring, i) => {
      ring.rotation.z = t * 0.05 * (i % 2 === 0 ? 1 : -1) + rings[i].phase;
    });
  });

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} position={r.position} quaternion={r.quaternion}>
          <torusGeometry args={[3.4, 0.012, 6, 72]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? "#e5330c" : "#5a544a"}
            transparent
            opacity={i % 4 === 0 ? 0.55 : 0.35}
          />
        </mesh>
      ))}
    </group>
  );
}
