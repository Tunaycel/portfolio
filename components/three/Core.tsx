"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CORE, mulberry32 } from "./path";

const ORBITER_COUNT = 14;

/**
 * The Zero Trust core: an ember heart inside a wireframe cage,
 * with request "packets" orbiting — each one being verified.
 */
export function Core() {
  const cage = useRef<THREE.Mesh>(null);
  const orbiters = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const orbits = useMemo(() => {
    const rng = mulberry32(451);
    return Array.from({ length: ORBITER_COUNT }, () => ({
      radius: 2.9 + rng() * 0.8,
      speed: 0.25 + rng() * 0.35,
      phase: rng() * Math.PI * 2,
      tilt: rng() * Math.PI
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cage.current) {
      cage.current.rotation.y = t * 0.08;
      cage.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    }
    const im = orbiters.current;
    if (im) {
      for (let i = 0; i < ORBITER_COUNT; i++) {
        const o = orbits[i];
        const a = t * o.speed + o.phase;
        dummy.position.set(
          CORE.x + Math.cos(a) * o.radius,
          CORE.y + Math.sin(a) * Math.sin(o.tilt) * o.radius * 0.6,
          CORE.z + Math.sin(a) * Math.cos(o.tilt) * o.radius
        );
        dummy.rotation.set(a, a * 1.3, 0);
        dummy.scale.setScalar(0.05);
        dummy.updateMatrix();
        im.setMatrixAt(i, dummy.matrix);
      }
      im.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* ember heart — the only thing in the scene that truly glows */}
      <mesh position={CORE}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ff5a2c" toneMapped={false} />
      </mesh>
      <pointLight position={CORE} intensity={26} distance={22} color="#e5330c" />

      <mesh ref={cage} position={CORE}>
        <icosahedronGeometry args={[2.42, 1]} />
        <meshBasicMaterial color="#8a8478" wireframe transparent opacity={0.14} />
      </mesh>

      <instancedMesh ref={orbiters} args={[undefined, undefined, ORBITER_COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ebe5da" transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}
