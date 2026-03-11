import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const TECHNOLOGIES = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "Docker", color: "#2496ed" },
  { name: "GraphQL", color: "#e535ab" },
  { name: "Python", color: "#3776ab" },
  { name: "AWS", color: "#ff9900" },
  { name: "Redis", color: "#dc382d" },
  { name: "Git", color: "#f05032" },
];

// Single orbiting tech label
function TechOrbit({
  name,
  color,
  index,
  total,
  radius,
  tiltAngle,
}: {
  name: string;
  color: string;
  index: number;
  total: number;
  radius: number;
  tiltAngle: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const initialAngle = (index / total) * Math.PI * 2;
  // Each orbit ring rotates at slightly different speed
  const speed = 0.3 + (index % 3) * 0.1;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * speed + initialAngle;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.y = Math.sin(t) * radius * Math.sin(tiltAngle);
    groupRef.current.position.z = Math.sin(t) * radius * Math.cos(tiltAngle);
  });

  return (
    <group ref={groupRef}>
      {/* Small dot */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gowFXDsG-TffA.woff2"
      >
        {name}
      </Text>
    </group>
  );
}

// Central glowing sphere
function CentralSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.2;
    ref.current.rotation.x = clock.elapsedTime * 0.1;
  });

  return (
    <Sphere ref={ref} args={[0.7, 64, 64]}>
      <MeshDistortMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.1}
        distort={0.3}
        speed={2}
        wireframe={false}
      />
    </Sphere>
  );
}

// Orbit ring visual
function OrbitRing({ radius, tiltAngle, color }: { radius: number; tiltAngle: number; color: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius * Math.sin(tiltAngle),
        Math.sin(a) * radius * Math.cos(tiltAngle)
      ));
    }
    return pts;
  }, [radius, tiltAngle]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    // @ts-ignore - R3F line element (not SVGLineElement)
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
}

export default function TechSphere() {
  const outerGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!outerGroup.current) return;
    // Gentle overall rotation
    outerGroup.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={outerGroup}>
      <CentralSphere />
      <pointLight position={[0, 0, 0]} color="#00ffff" intensity={2} distance={5} />

      {/* Three orbit rings at different tilts */}
      <OrbitRing radius={1.8} tiltAngle={Math.PI / 6} color="#00ffff" />
      <OrbitRing radius={2.4} tiltAngle={Math.PI / 3} color="#a855f7" />
      <OrbitRing radius={2.0} tiltAngle={-Math.PI / 4} color="#3b82f6" />

      {/* Distribute techs across three rings */}
      {TECHNOLOGIES.slice(0, 4).map((tech, i) => (
        <TechOrbit
          key={tech.name}
          name={tech.name}
          color={tech.color}
          index={i}
          total={4}
          radius={1.8}
          tiltAngle={Math.PI / 6}
        />
      ))}
      {TECHNOLOGIES.slice(4, 8).map((tech, i) => (
        <TechOrbit
          key={tech.name}
          name={tech.name}
          color={tech.color}
          index={i}
          total={4}
          radius={2.4}
          tiltAngle={Math.PI / 3}
        />
      ))}
      {TECHNOLOGIES.slice(8).map((tech, i) => (
        <TechOrbit
          key={tech.name}
          name={tech.name}
          color={tech.color}
          index={i}
          total={4}
          radius={2.0}
          tiltAngle={-Math.PI / 4}
        />
      ))}
    </group>
  );
}
