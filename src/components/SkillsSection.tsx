import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

type Tier = "Core" | "Comfortable" | "Familiar" | "Learning";

const TIER_WEIGHT: Record<Tier, number> = {
  Core: 1,
  Comfortable: 0.78,
  Familiar: 0.58,
  Learning: 0.4,
};

const SKILLS: {
  name: string;
  tier: Tier;
  color: string;
  category: string;
}[] = [
  { name: "React", tier: "Core", color: "#61dafb", category: "Frontend" },
  { name: "TypeScript", tier: "Core", color: "#3178c6", category: "Language" },
  { name: "Next.js", tier: "Core", color: "#ffffff", category: "Frontend" },
  { name: "Tailwind CSS", tier: "Core", color: "#38bdf8", category: "Styling" },
  { name: "Node.js", tier: "Comfortable", color: "#68a063", category: "Backend" },
  { name: "Express.js", tier: "Comfortable", color: "#a855f7", category: "Backend" },
  { name: "PostgreSQL", tier: "Comfortable", color: "#336791", category: "Database" },
  { name: "MongoDB", tier: "Comfortable", color: "#4db33d", category: "Database" },
  { name: "Python", tier: "Comfortable", color: "#3776ab", category: "Language" },
  { name: "Docker", tier: "Comfortable", color: "#2496ed", category: "DevOps" },
  { name: "Git", tier: "Core", color: "#f05032", category: "DevOps" },
  { name: "REST APIs", tier: "Core", color: "#e535ab", category: "API" },
  { name: "Linux", tier: "Comfortable", color: "#fbbf24", category: "OS" },
  { name: "React Native", tier: "Familiar", color: "#61dafb", category: "Mobile" },
  { name: "Jenkins", tier: "Familiar", color: "#d33833", category: "DevOps" },
  { name: "AWS", tier: "Familiar", color: "#ff9900", category: "Cloud" },
];

const TIER_ORDER: Tier[] = ["Core", "Comfortable", "Familiar", "Learning"];

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
  const widthPct = TIER_WEIGHT[skill.tier] * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
          />
          <span className="text-sm font-mono font-semibold text-foreground truncate">{skill.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono hidden sm:inline-block">
            {skill.category}
          </span>
        </div>
        <span className="text-xs font-mono whitespace-nowrap" style={{ color: skill.color }}>
          {skill.tier}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${widthPct}%` } : {}}
          transition={{ delay: 0.5 + index * 0.06, duration: 1.4, ease: "easeOut" }}
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
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Defer mounting the 3D Canvas until the section is within ~1 viewport.
  // This keeps the heavy three/drei chunk dormant on initial paint.
  const [shouldMount3D, setShouldMount3D] = useState(false);

  useEffect(() => {
    if (shouldMount3D) return;
    const node = canvasRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldMount3D(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount3D(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount3D]);

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
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            Grouped by how confidently I reach for each tool — from daily drivers to recent additions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D orbit canvas (lazy-mounted via IntersectionObserver) */}
          <motion.div
            ref={canvasRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-80 sm:h-[450px] rounded-2xl overflow-hidden border-neon relative"
            style={{ background: "hsl(230 25% 5%)" }}
          >
            {shouldMount3D ? (
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
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div
                    className="w-16 h-16 rounded-full border border-neon-cyan/30 animate-pulse-glow"
                    style={{ background: "radial-gradient(circle, hsl(var(--neon-purple) / 0.3) 0%, transparent 70%)" }}
                  />
                  <span className="text-xs font-mono tracking-widest uppercase">Loading scene…</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Skill bars grouped by tier */}
          <div className="space-y-6">
            {TIER_ORDER.filter(tier => SKILLS.some(s => s.tier === tier)).map((tier) => {
              const tierSkills = SKILLS.filter(s => s.tier === tier);
              return (
                <div key={tier}>
                  <p className="text-xs font-mono tracking-widest uppercase text-neon-cyan mb-3">
                    {tier}{" "}
                    <span className="text-muted-foreground/60">
                      / {tier === "Core" ? "daily drivers" : tier === "Comfortable" ? "ship in production" : tier === "Familiar" ? "used in projects" : "actively learning"}
                    </span>
                  </p>
                  <div className="space-y-3">
                    {tierSkills.map((skill, i) => {
                      const globalIndex = SKILLS.indexOf(skill);
                      return (
                        <SkillBar key={skill.name} skill={skill} isInView={isInView} index={globalIndex} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
