import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Database, Globe } from "lucide-react";
import TechSphere from "./TechSphere";

const highlights = [
  {
    icon: Code2,
    label: "Frontend",  
    desc: "React, JavaScript, TypeScript, Next.js",
    color: "neon-cyan",
  },
  {
    icon: Server,
    label: "Backend",
    desc: "Node.js, Express.js, REST APIs",
    color: "neon-purple",
  },
  {
    icon: Database,
    label: "Databases",
    desc: "MongoDB, PostgreSQL, Redis, MySql",
    color: "neon-blue",
  },
  {
    icon: Globe,
    label: "Deployed",
    desc: "Vercel, Docker,Jenkins,AWS",
    color: "neon-green",
  },
];

const colorMap: Record<string, string> = {
  "neon-cyan": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
  "neon-purple": "text-neon-purple border-neon-purple/30 bg-neon-purple/5",
  "neon-blue": "text-neon-blue border-neon-blue/30 bg-neon-blue/5",
  "neon-green": "text-neon-green border-neon-green/30 bg-neon-green/5",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-widest text-neon-cyan uppercase">
      {"// "}{children}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <SectionLabel>01. About Me</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Crafting Digital{" "}
            <span className="text-gradient">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm an aspiring <span className="text-foreground font-semibold">Full Stack Developer</span> with a
                passion for building scalable, performant, and visually stunning web applications.
              </p>
              <p>
                I specialize in the React ecosystem on the frontend and Node.js/Express.js on the backend,
                delivering end-to-end solutions that blend great user experiences with robust architecture.
              </p>
              <p>
                I'm particularly passionate about <span className="text-neon-purple font-semibold">
                  WebGL, 3D rendering, and interactive web experiences</span>. When I'm not coding,
                you'll find me contributing to open source projects or exploring the latest in
                web technology.
              </p>
              <div className="pt-2 font-mono text-xs space-y-1">
                <p className="text-neon-cyan">const developer = {"{"}</p>
                <p className="pl-4 text-muted-foreground">location: <span className="text-neon-green">"Bengaluru, Karnataka"</span>,</p>
                <p className="pl-4 text-muted-foreground">openTo: <span className="text-neon-green">["remote", "hybrid", "full-time"]</span>,</p>
                <p className="pl-4 text-muted-foreground">coffee: <span className="text-neon-cyan">true</span></p>
                <p className="text-neon-cyan">{"}"}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label, desc, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className={`border rounded-xl p-4 ${colorMap[color]}`}
                >
                  <Icon size={16} className="mb-2 opacity-80" />
                  <div className="text-xl font-bold text-foreground">{label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Tech Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden border-neon"
            style={{ background: "hsl(230 25% 5%)" }}
          >
            <Canvas dpr={[1, 1.5]}>
              <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
              <ambientLight intensity={0.2} />
              <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1.5} />
              <pointLight position={[-5, -5, 5]} color="#a855f7" intensity={1} />
              <Suspense fallback={null}>
                <TechSphere />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI * 3 / 4}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
