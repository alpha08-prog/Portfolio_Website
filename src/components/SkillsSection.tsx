import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

const SKILLS = [
  { name: "React", level: 95, color: "#61dafb", category: "Frontend" },
  { name: "TypeScript", level: 92, color: "#3178c6", category: "Language" },
  { name: "Next.js", level: 90, color: "#ffffff", category: "Frontend" },
  { name: "Node.js", level: 88, color: "#68a063", category: "Backend" },
  { name: "Tailwind CSS", level: 94, color: "#38bdf8", category: "Styling" },
  { name: "MongoDB", level: 85, color: "#4db33d", category: "Database" },
  { name: "Docker", level: 82, color: "#2496ed", category: "DevOps" },
  { name: "Git", level: 93, color: "#f05032", category: "DevOps" },
  { name: "GraphQL", level: 80, color: "#e535ab", category: "API" },
  { name: "Python", level: 78, color: "#3776ab", category: "Language" },
  { name: "AWS", level: 76, color: "#ff9900", category: "Cloud" },
  { name: "PostgreSQL", level: 84, color: "#336791", category: "Database" },
];

const CATEGORIES = ["Frontend", "Backend", "Language", "Database", "DevOps", "API", "Cloud", "Styling"];

// 3D orbiting skill labels
function SkillOrbit({
  name,
  color,
  index,
  total,
}: {
  name: string;
  color: string;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseAngle = (index / total) * Math.PI * 2;
  // Three rings, alternating tilt
  const ring = index % 3;
  const radius = 2.2 + ring * 0.4;
  const tilt = [Math.PI / 5, Math.PI / 2.5, -Math.PI / 4][ring];
  const speed = [0.3, 0.22, 0.38][ring];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * speed + baseAngle;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.y = Math.sin(t) * radius * Math.sin(tilt);
    groupRef.current.position.z = Math.sin(t) * radius * Math.cos(tilt);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.14}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.15;
  });

  return (
    <Sphere ref={ref} args={[0.8, 64, 64]}>
      <MeshDistortMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.05}
        distort={0.35}
        speed={1.5}
      />
    </Sphere>
  );
}

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color="#a855f7" intensity={2} distance={8} />
      <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1} distance={15} />
      <pointLight position={[-5, -5, 5]} color="#3b82f6" intensity={0.8} distance={15} />
      <CoreSphere />
      {SKILLS.map((skill, i) => (
        <SkillOrbit key={skill.name} name={skill.name} color={skill.color} index={i} total={SKILLS.length} />
      ))}
    </>
  );
}

function SkillBar({ skill, isInView, index }: { skill: (typeof SKILLS)[0]; isInView: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
          />
          <span className="text-sm font-mono font-semibold text-foreground">{skill.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
            {skill.category}
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}50`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-blue uppercase">
            {"// "}03. Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Tools of the{" "}
            <span className="text-gradient-blue">Trade</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D orbit canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-80 sm:h-[450px] rounded-2xl overflow-hidden border-neon"
            style={{ background: "hsl(230 25% 5%)" }}
          >
            <Canvas dpr={[1, 1.5]}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </motion.div>

          {/* Right: Skill bars */}
          <div className="space-y-4">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} isInView={isInView} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
