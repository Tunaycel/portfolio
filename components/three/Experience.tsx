"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import { Rig } from "./Rig";
import { Shards } from "./Shards";
import { Stars } from "./Stars";
import { Tunnel } from "./Tunnel";
import { Slabs } from "./Slabs";
import { Core } from "./Core";
import { Cluster } from "./Cluster";
import { SIGNAL } from "./path";

/** The fixed full-screen WebGL world behind the entire page. */
export function Experience({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 50, near: 0.1, far: 140, position: [0, 0.2, 9] }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0 }}
    >
      <color attach="background" args={["#070605"]} />
      <fog attach="fog" args={["#070605", 6, 42]} />

      <ambientLight intensity={0.16} />
      <directionalLight position={[6, 9, 4]} intensity={1.3} color="#ebe5da" />
      <directionalLight position={[-7, -3, -6]} intensity={0.4} color="#4a443b" />

      <Stars />
      <Tunnel />
      <Slabs />
      <Core />
      <Cluster />
      <Shards progress={progress} />
      <Rig progress={progress} />

      {/* the last thing you reach: a lone signal in the dark */}
      <mesh position={SIGNAL}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ff5a2c" toneMapped={false} />
      </mesh>
      <pointLight position={SIGNAL} intensity={10} distance={14} color="#e5330c" />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.28} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.28} darkness={0.78} />
      </EffectComposer>
    </Canvas>
  );
}
