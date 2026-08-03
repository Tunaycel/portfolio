"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RAIL, ZONES, mulberry32 } from "./path";

const COUNT = 22;

/** Constellation of small artefacts near the projects chapter. */
export function Cluster() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const items = useMemo(() => {
    const rng = mulberry32(1337);
    const center = RAIL.getPoint(ZONES.cluster);
    return Array.from({ length: COUNT }, () => {
      const angle = rng() * Math.PI * 2;
      const r = 2 + rng() * 4;
      return {
        base: new THREE.Vector3(
          center.x + Math.cos(angle) * r,
          center.y + (rng() - 0.5) * 3,
          center.z + (rng() - 0.5) * 8
        ),
        scale: 0.08 + rng() * 0.12,
        phase: rng() * Math.PI * 2,
        speed: 0.2 + rng() * 0.4
      };
    });
  }, []);

  useFrame((state) => {
    const im = mesh.current;
    if (!im) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const it = items[i];
      dummy.position.set(
        it.base.x,
        it.base.y + Math.sin(t * it.speed + it.phase) * 0.3,
        it.base.z
      );
      dummy.rotation.set(t * it.speed, t * it.speed * 0.7 + it.phase, 0);
      dummy.scale.setScalar(it.scale);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    }
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#3a352d" metalness={0.7} roughness={0.4} flatShading />
    </instancedMesh>
  );
}
