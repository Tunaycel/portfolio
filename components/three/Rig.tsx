"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { RAIL, damp } from "./path";

/** Drives the camera along the rail from scroll progress, with pointer sway. */
export function Rig({ progress }: { progress: MotionValue<number> }) {
  const look = useRef(RAIL.getPoint(0.05).clone());
  const targetPos = useRef(new THREE.Vector3());
  const sway = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1);
    const cam = state.camera;

    RAIL.getPoint(p, targetPos.current);
    sway.current.set(state.pointer.x * 0.55, state.pointer.y * 0.35, 0);
    targetPos.current.add(sway.current);

    const k = damp(4.5, delta);
    cam.position.lerp(targetPos.current, k);

    const ahead = RAIL.getPoint(Math.min(p + 0.05, 1));
    look.current.lerp(ahead, k);
    cam.lookAt(look.current);
  });

  return null;
}
