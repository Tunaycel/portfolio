"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
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
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.4, 8.3);
    camera.lookAt(0, 0, 0);
    const world = new THREE.Group();
    world.rotation.set(0.28, -0.32, 0.12);
    scene.add(world);
    scene.add(new THREE.AmbientLight(0xc7ead5, 1.5));
    const key = new THREE.DirectionalLight(0xe7ffd1, 4);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x9bcffc, 35);
    rim.position.set(-3, 0, -2);
    scene.add(rim);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c3027,
      metalness: 0.8,
      roughness: 0.32,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc6f68c,
      transparent: true,
      opacity: 0.85,
    });
    const coreGeometry = new THREE.IcosahedronGeometry(1.15, 0),
      core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.add(new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry), lineMaterial));
    world.add(core);
    const shells = new THREE.Group();
    world.add(shells);
    const barGeometry = new THREE.BoxGeometry(0.055, 0.055, 0.42);
    const barMaterial = new THREE.MeshStandardMaterial({
      color: 0x99be81,
      metalness: 0.6,
      roughness: 0.35,
    });
    const nodes = new THREE.InstancedMesh(barGeometry, barMaterial, 132);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 132; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 132),
        theta = Math.PI * (1 + Math.sqrt(5)) * i;
      dummy.position.setFromSphericalCoords(1.78, phi, theta);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
    }
    shells.add(nodes);
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.13 + i * 0.16, 0.008, 6, 160),
        new THREE.MeshBasicMaterial({
          color: 0xbce98d,
          transparent: true,
          opacity: i === 0 ? 0.65 : 0.24,
        }),
      );
      ring.rotation.set(i * 0.9 + 0.7, i * 0.8, 0.3 + i * 0.4);
      world.add(ring);
      rings.push(ring);
    }
    const orbitDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xecffc9 }),
    );
    world.add(orbitDot);
    const grid = new THREE.GridHelper(14, 28, 0x334138, 0x19261f);
    grid.position.y = -2.6;
    scene.add(grid);
    let frame = 0,
      visible = true,
      disposed = false,
      angle = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };
    const colors = [0xbce98d, 0x9ecdf5, 0xe2baa0];
    const draw = (time: number) => {
      frame = 0;
      if (disposed) return;
      const dt = Math.min((time - last) / 1000, 0.035);
      last = time;
      const running = state.current.motion && visible && !document.hidden;
      if (running) {
        angle += dt * 0.17;
        world.rotation.y += dt * 0.07;
        core.rotation.y -= dt * 0.14;
      }
      shells.rotation.y = angle * 0.5;
      world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, 0.24 + pointer.y * 0.13, 0.05);
      world.rotation.z = THREE.MathUtils.lerp(world.rotation.z, 0.1 + pointer.x * 0.1, 0.05);
      const color = new THREE.Color(colors[state.current.mode]);
      lineMaterial.color.lerp(color, running ? 0.08 : 1);
      barMaterial.color.lerp(color, running ? 0.08 : 1);
      orbitDot.position.set(Math.cos(angle) * 2.4, Math.sin(angle) * 1.4, Math.sin(angle) * 1.4);
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
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onError]);
  return <div className="spatial-scene" ref={host} />;
}
