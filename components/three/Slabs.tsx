"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RAIL, ZONES } from "./path";

/** Two floating monolith slabs — one per work chapter — flanking the rail. */
export function Slabs() {
  const group = useRef<THREE.Group>(null);

  const slabs = useMemo(() => {
    return [
      { p: ZONES.slabA, side: 1 },
      { p: ZONES.slabB, side: -1 }
    ].map(({ p, side }) => {
      const base = RAIL.getPoint(p);
      return {
        position: new THREE.Vector3(base.x + side * 2.6, base.y + 0.2, base.z),
        rotationY: side * 0.5
      };
    });
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((slab, i) => {
      slab.position.y = slabs[i].position.y + Math.sin(t * 0.5 + i * 2.1) * 0.15;
      slab.rotation.y = slabs[i].rotationY + Math.sin(t * 0.2 + i) * 0.06;
    });
  });

  return (
    <group ref={group}>
      {slabs.map((s, i) => (
        <group key={i} position={s.position} rotation={[0, s.rotationY, 0]}>
          <mesh>
            <boxGeometry args={[1.7, 2.6, 0.12]} />
            <meshStandardMaterial color="#12100d" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh scale={1.001}>
            <boxGeometry args={[1.7, 2.6, 0.12]} />
            <meshBasicMaterial color="#e5330c" wireframe transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
