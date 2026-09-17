"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
type Props = { mode: number; motion: boolean; onReady: () => void; onError: () => void };
export default function SpatialScene({ mode, motion, onReady, onError }: Props) {
  const host = useRef<HTMLDivElement>(null),
    state = useRef({ mode, motion }),
    refresh = useRef<() => void>(() => {});
  useEffect(() => {
    state.current = { mode, motion };
    refresh.current();
  }, [mode, motion]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      onError();
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.8);
    camera.lookAt(0, 0, 0);
    const world = new THREE.Group();
    world.rotation.set(0.22, -0.32, -0.2);
    scene.add(world);
    // A generated studio environment gives the metal broad softbox reflections.
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.9;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xf4f9ec, 0x132219, 1.1));
    const key = new THREE.DirectionalLight(0xf6ffe9, 1.8);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc5f58b, 2.5);
    rim.position.set(3, -1, -3);
    scene.add(rim);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa4cd78,
      metalness: 0.55,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });
    const silver = new THREE.MeshPhysicalMaterial({
      color: 0xa9b3a3,
      metalness: 0.94,
      roughness: 0.24,
      clearcoat: 0.35,
    });
    const graphite = new THREE.MeshStandardMaterial({
      color: 0x25342a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: 0xc5f58b,
      metalness: 0.5,
      roughness: 0.25,
      emissive: 0x80ab48,
      emissiveIntensity: 0.12,
    });
    const coreGeometry = new THREE.SphereGeometry(0.76, 64, 48),
      core = new THREE.Mesh(coreGeometry, coreMaterial);
    world.add(core);
    const rings: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Group();
      const radius = 1.16 + i * 0.34;
      // Flatten the tube into a rounded machined band rather than a wire orbit.
      const band = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.105, 20, 192), silver);
      band.scale.z = 1.75;
      ring.add(band);
      const inlay = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.018, 0.018, 10, 192),
        i === 1 ? accent : graphite,
      );
      inlay.position.z = 0.18;
      ring.add(inlay);
      const orientation = [
        [0.9, 0.35, -0.4],
        [-0.65, 0.45, 0.55],
        [0.25, -0.7, -0.25],
      ][i];
      ring.rotation.set(orientation[0], orientation[1], orientation[2]);
      world.add(ring);
      rings.push(ring);
    }
    let frame = 0,
      visible = true,
      disposed = false,
      angle = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };
    const colors = [0xa4cd78, 0x91b7d5, 0xc7a58b];
    const targetColor = new THREE.Color();
    const draw = (time: number) => {
      frame = 0;
      if (disposed) return;
      const dt = Math.min((time - last) / 1000, 0.035);
      last = time;
      const running = state.current.motion && visible && !document.hidden;
      if (running) {
        angle += dt * 0.12;
        world.rotation.y = -0.32 + Math.sin(angle * 0.45) * 0.25;
        rings[0].rotation.y = 0.35 + Math.sin(angle * 0.7) * 0.3;
        rings[1].rotation.x = -0.65 + Math.sin(angle) * 0.22;
        rings[2].rotation.z = -0.25 + Math.sin(angle * 0.6) * 0.2;
      }
      if (running) {
        const damping = 1 - Math.exp(-dt * 3);
        world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, 0.22 + pointer.y * 0.12, damping);
        world.rotation.z = THREE.MathUtils.lerp(world.rotation.z, -0.2 + pointer.x * 0.12, damping);
      }
      targetColor.setHex(colors[state.current.mode]);
      coreMaterial.color.lerp(targetColor, running ? 1 - Math.exp(-dt * 5) : 1);
      accent.color.copy(coreMaterial.color);
      renderer.render(scene, camera);
      if (running) frame = requestAnimationFrame(draw);
    };
    const request = () => {
      if (!frame && !disposed) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    refresh.current = request;
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (width > 0 && height > 0) {
        camera.aspect = width / height;
        // Keep the full object within both narrow portrait and wide desktop frames.
        camera.position.z = Math.max(8.8, 7.1 / camera.aspect);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        request();
      }
    };
    const move = (e: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
      if (state.current.motion) request();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      onError();
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    element.addEventListener("pointermove", move);
    document.addEventListener("visibilitychange", request);
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      request();
    });
    intersection.observe(element);
    resize();
    onReady();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      refresh.current = () => {};
      observer.disconnect();
      intersection.disconnect();
      element.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", request);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onError]);
  return <div className="spatial-scene" ref={host} />;
}
