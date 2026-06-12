"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import type { Group } from "three";

/* Soft morphing sage orbs drifting in depth behind the hero — a calm,
   out-of-focus botanical atmosphere. The whole group eases toward the
   mouse for a barely-perceptible parallax. */

function Orbs() {
  const group = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const damp = 1 - Math.exp(-1.6 * delta);
    group.current.rotation.y += (mouse.current.x * 0.12 - group.current.rotation.y) * damp;
    group.current.rotation.x += (mouse.current.y * 0.08 - group.current.rotation.x) * damp;
  });

  return (
    <group ref={group}>
      <Float speed={0.7} rotationIntensity={0.25} floatIntensity={1.1}>
        <mesh position={[2.6, 0.4, -2]} scale={2.1}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#C4D9C6"
            distort={0.35}
            speed={1.1}
            roughness={0.9}
            transparent
            opacity={0.55}
          />
        </mesh>
      </Float>

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.9}>
        <mesh position={[3.4, -1.6, -4]} scale={1.5}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#6B8C6F"
            distort={0.3}
            speed={0.8}
            roughness={0.95}
            transparent
            opacity={0.32}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={1.3}>
        <mesh position={[-3.2, -1.8, -5]} scale={1.1}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#EBF2EC"
            distort={0.42}
            speed={1.3}
            roughness={0.9}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    /* Skip the WebGL scene for reduced-motion users and small screens. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    if (!reduced && !small) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 5]} intensity={0.9} color="#F5F3EF" />
        <Orbs />
      </Canvas>
    </div>
  );
}
