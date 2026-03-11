import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Torus, Octahedron, Box } from "@react-three/drei";
import * as THREE from "three";

// Floating geometric shapes for the hero scene
function FloatingSphere({ position, color, speed, scale }: {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <Sphere ref={ref} args={[scale, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        metalness={0.8}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe={false}
      />
    </Sphere>
  );
}

function FloatingTorus({ position, color, speed }: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.4;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.2;
  });

  return (
    <Torus ref={ref} args={[0.6, 0.15, 16, 100]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe={false}
      />
    </Torus>
  );
}

function FloatingOctahedron({ position, color, speed, scale }: {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <Octahedron ref={ref} args={[scale]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.4}
        wireframe
      />
    </Octahedron>
  );
}

function FloatingBox({ position, color, speed }: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = t * 0.2;
  });

  return (
    <Box ref={ref} args={[0.7, 0.7, 0.7]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
      />
    </Box>
  );
}

export default function FloatingGeometry() {
  return (
    <>
      {/* Main central sphere */}
      <FloatingSphere position={[3.5, 0.5, -2]} color="#00ffff" speed={0.4} scale={0.8} />
      <FloatingSphere position={[-4, 1, -3]} color="#a855f7" speed={0.3} scale={0.6} />
      <FloatingSphere position={[5, -1, -4]} color="#3b82f6" speed={0.5} scale={0.5} />

      {/* Torus rings */}
      <FloatingTorus position={[-3, 0.5, -1]} color="#00ffff" speed={0.5} />
      <FloatingTorus position={[4, -0.5, -3]} color="#a855f7" speed={0.35} />

      {/* Octahedrons */}
      <FloatingOctahedron position={[2, 1.5, -1]} color="#00ffff" speed={0.6} scale={0.5} />
      <FloatingOctahedron position={[-2, -0.5, -2]} color="#f59e0b" speed={0.4} scale={0.4} />
      <FloatingOctahedron position={[-5, 0, -4]} color="#3b82f6" speed={0.5} scale={0.35} />

      {/* Boxes */}
      <FloatingBox position={[1, -1.5, -1.5]} color="#a855f7" speed={0.45} />
      <FloatingBox position={[-1.5, 1.5, -2]} color="#00ffff" speed={0.55} />
    </>
  );
}
