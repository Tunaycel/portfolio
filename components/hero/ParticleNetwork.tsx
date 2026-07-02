"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * NODE NETWORK
 * - 4500 particles distributed inside a soft fibonacci sphere
 *   (so the cloud reads as a coherent 3D structure, not a cube)
 * - A custom shader interpolates each point's color between
 *   "threat red" and "verified cyan/green" based on its distance
 *   to a 3D scanner point driven by the mouse.
 * - 80 brighter "core nodes" and a subset of edges drawn as Lines
 *   to suggest a neural / Azure topology.
 */

const COUNT = 4500;
const CORE_COUNT = 80;
const SPHERE_RADIUS = 3.2;

// ----- shaders -----
const vertex = /* glsl */ `
  uniform vec3 uScanner;
  uniform float uScanRadius;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aSeed;

  varying float vScan; // 0 → unscanned (red), 1 → scanned (cyan)
  varying float vSeed;

  void main() {
    // gentle organic drift
    vec3 pos = position;
    float t = uTime * 0.4;
    pos.x += sin(t + aSeed * 6.2831) * 0.03;
    pos.y += cos(t * 1.1 + aSeed * 6.2831) * 0.03;
    pos.z += sin(t * 0.9 + aSeed * 12.566) * 0.03;

    // distance to scanner in world space
    float d = distance(pos, uScanner);
    // smooth falloff inside scanner radius
    vScan = 1.0 - smoothstep(0.0, uScanRadius, d);
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // perspective-correct point size
    float size = uSize * (1.0 + vScan * 1.6);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorThreat;
  uniform vec3 uColorVerified;
  varying float vScan;
  varying float vSeed;

  void main() {
    // round soft point
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    float alpha = smoothstep(0.5, 0.0, r);
    if (alpha < 0.01) discard;

    vec3 col = mix(uColorThreat, uColorVerified, vScan);

    // subtle inner core boost
    col += vScan * 0.35;

    // flicker on a few seeds (scanner pulse)
    float pulse = step(0.985, fract(vSeed * 113.0));
    col += pulse * vScan * 0.4;

    gl_FragColor = vec4(col, alpha * (0.55 + vScan * 0.45));
  }
`;

function fibonacciSphere(n: number, radius: number) {
  // golden-ratio sphere — even distribution
  const positions = new Float32Array(n * 3);
  const seeds = new Float32Array(n);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    // jitter radius a little so it feels organic
    const rad = radius * (0.85 + Math.random() * 0.25);
    positions[i * 3 + 0] = Math.cos(theta) * r * rad;
    positions[i * 3 + 1] = y * rad;
    positions[i * 3 + 2] = Math.sin(theta) * r * rad;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size, pointer } = useThree();

  const { positions, seeds } = useMemo(() => fibonacciSphere(COUNT, SPHERE_RADIUS), []);

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uScanner:    { value: new THREE.Vector3(99, 99, 99) },
      uScanRadius: { value: 1.6 },
      uSize:       { value: 18.0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uColorThreat:   { value: new THREE.Color("#ff2d55") },
      uColorVerified: { value: new THREE.Color("#00ffd5") }
    }),
    []
  );

  // smooth pointer-projected scanner position
  const scannerTarget = useMemo(() => new THREE.Vector3(), []);
  const scanner = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, dt) => {
    const u = matRef.current.uniforms;
    u.uTime.value += dt;

    // project mouse onto sphere's z=0 plane
    // pointer is in NDC (-1..1)
    scannerTarget.set(
      pointer.x * (viewport.width / 2),
      pointer.y * (viewport.height / 2),
      0
    );
    // critically-damped lerp (snappy but smooth)
    scanner.lerp(scannerTarget, 1 - Math.pow(0.001, dt));
    u.uScanner.value.copy(scanner);

    // gentle global rotation
    if (ref.current) {
      ref.current.rotation.y += dt * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} count={seeds.length} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreNodes() {
  // a few brighter "core" nodes (representing high-value Azure resources)
  const ref = useRef<THREE.Group>(null!);
  const data = useMemo(() => {
    const arr: { p: THREE.Vector3; phase: number }[] = [];
    for (let i = 0; i < CORE_COUNT; i++) {
      // distribute on inner sphere
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
      const r = SPHERE_RADIUS * (0.55 + Math.random() * 0.35);
      arr.push({
        p: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        phase: Math.random() * Math.PI * 2
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0008;
  });

  return (
    <group ref={ref}>
      {data.map((d, i) => (
        <mesh key={i} position={d.p}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#00ffd5" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function NetworkEdges() {
  // sparse connections between random pairs of points to suggest a graph
  const positions = useMemo(() => {
    const pairs = 220;
    const verts: number[] = [];
    const tmp = fibonacciSphere(80, SPHERE_RADIUS * 0.85);
    const N = tmp.positions.length / 3;
    for (let i = 0; i < pairs; i++) {
      const a = Math.floor(Math.random() * N);
      let b = Math.floor(Math.random() * N);
      if (a === b) b = (b + 1) % N;
      verts.push(
        tmp.positions[a * 3], tmp.positions[a * 3 + 1], tmp.positions[a * 3 + 2],
        tmp.positions[b * 3], tmp.positions[b * 3 + 1], tmp.positions[b * 3 + 2]
      );
    }
    return new Float32Array(verts);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <lineBasicMaterial color="#00ffd5" transparent opacity={0.08} />
    </lineSegments>
  );
}

export function ParticleNetwork() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.5], fov: 55, near: 0.1, far: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 14]} />
      <ambientLight intensity={0.4} />
      <ParticleField />
      <CoreNodes />
      <NetworkEdges />
    </Canvas>
  );
}
