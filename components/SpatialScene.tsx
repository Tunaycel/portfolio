"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
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
    camera.position.set(5.8, 4.7, 7.2);
    camera.lookAt(0, 0, 0);
    const world = new THREE.Group();
    world.rotation.set(0, -0.2, 0);
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
    const metal = new THREE.MeshStandardMaterial({
      color: 0x728174,
      metalness: 0.8,
      roughness: 0.34,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x15241c,
      metalness: 0.5,
      roughness: 0.4,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x8ca580,
      metalness: 0.25,
      roughness: 0.28,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const layers: THREE.Group[] = [];
    const highlights: THREE.MeshStandardMaterial[] = [];
    const box = (
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      material: THREE.Material,
    ) => {
      const mesh = new THREE.Mesh(
        new RoundedBoxGeometry(w, h, d, 3, Math.min(0.055, h / 3)),
        material,
      );
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Group();
      layer.position.y = (i - 1) * 1.05;
      world.add(layer);
      layers.push(layer);
      const light = new THREE.MeshStandardMaterial({
        color: 0xc5f58b,
        emissive: 0xc5f58b,
        emissiveIntensity: 0.25,
        metalness: 0.3,
        roughness: 0.35,
      });
      highlights.push(light);
      box(layer, 2.7, 0.14, 2.05, 0, 0, 0, metal);
      box(layer, 2.57, 0.04, 1.92, 0, 0.09, 0, dark);
      box(layer, 2.45, 0.035, 0.025, 0, 0.04, 1.03, light);
      for (const x of [-1.2, 1.2])
        for (const z of [-0.86, 0.86]) {
          const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.015, 12), dark);
          screw.position.set(x, 0.08, z);
          layer.add(screw);
        }
    }
    // Website documents become structured records. These are diagram symbols, not hardware.
    for (let i = 0; i < 3; i++) {
      box(layers[0], 0.62, 0.08, 1.16, (i - 1) * 0.79, 0.16, 0, metal);
      for (let j = 0; j < 4; j++)
        box(
          layers[0],
          j === 0 ? 0.35 : 0.44,
          0.016,
          0.035,
          (i - 1) * 0.79,
          0.21,
          -0.35 + j * 0.2,
          highlights[0],
        );
    }
    // Model stage: a central processor with precisely routed traces.
    box(layers[1], 0.88, 0.17, 0.88, 0, 0.2, 0, metal);
    box(layers[1], 0.67, 0.03, 0.67, 0, 0.3, 0, highlights[1]);
    for (let i = 0; i < 5; i++) {
      const offset = (i - 2) * 0.15;
      for (const side of [-1, 1]) {
        box(layers[1], 0.52, 0.018, 0.025, side * 0.78, 0.13, offset, highlights[1]);
        box(layers[1], 0.025, 0.018, 0.32, offset, 0.13, side * 0.64, highlights[1]);
      }
    }
    // Output stage: aligned records ready for the product database.
    box(layers[2], 2.28, 0.045, 1.55, 0, 0.14, 0, glass);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++)
        box(
          layers[2],
          col === 0 ? 0.28 : 0.53,
          0.025,
          0.075,
          -0.82 + col * 0.68,
          0.18,
          -0.5 + row * 0.31,
          highlights[2],
        );
    }
    const paths: THREE.CatmullRomCurve3[] = [];
    const packets: THREE.Mesh[] = [];
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xd8ffab });
    for (const x of [-1.55, 1.55]) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x * 0.8, -1.03, 0.4),
        new THREE.Vector3(x, -0.7, 0.4),
        new THREE.Vector3(x, 0.7, 0.4),
        new THREE.Vector3(x * 0.8, 1.08, 0.4),
      ]);
      paths.push(curve);
      world.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.012, 6, false), metal));
      const packet = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), packetMaterial);
      world.add(packet);
      packets.push(packet);
    }
    let ready = false;
    let frame = 0,
      visible = true,
      disposed = false,
      angle = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };

    const draw = (time: number) => {
      frame = 0;
      if (disposed) return;
      const dt = THREE.MathUtils.clamp((time - last) / 1000, 0, 0.035);
      last = time;
      const running = state.current.motion && visible && !document.hidden;
      if (running) {
        angle += dt * 0.16;
        const damping = 1 - Math.exp(-dt * 3);
        world.rotation.y = THREE.MathUtils.lerp(
          world.rotation.y,
          -0.2 + Math.sin(angle) * 0.07 + pointer.x * 0.12,
          damping,
        );
      }
      highlights.forEach((material, i) => {
        const selected = i === state.current.mode;
        material.color.setHex(selected ? 0xc5f58b : 0x718169);
        material.emissiveIntensity = selected ? 0.32 : 0;
      });
      packets.forEach((packet, i) =>
        packet.position.copy(paths[i].getPointAt((angle + i * 0.5) % 1)),
      );
      renderer.render(scene, camera);
      if (!ready) {
        ready = true;
        onReady();
      }
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
        camera.position.set(5.8, 4.7, 7.2).multiplyScalar(Math.max(1, 0.9 / camera.aspect));
        camera.lookAt(0, 0, 0);
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
