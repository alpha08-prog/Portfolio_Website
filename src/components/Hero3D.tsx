import { Suspense, useRef, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import Particles from "./Particles";
import NeonGrid from "./NeonGrid";
import FloatingGeometry from "./FloatingGeometry";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";

// Camera rig with mouse parallax
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.current[0] * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current[1] * 0.8 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Ambient neon lights
function SceneLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 1.5) * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} position={[5, 5, 5]} color="#00ffff" intensity={2} distance={20} />
      <pointLight position={[-5, -2, -5]} color="#a855f7" intensity={1.5} distance={20} />
      <pointLight position={[0, 3, -8]} color="#3b82f6" intensity={1} distance={15} />
      <directionalLight position={[0, 10, 5]} intensity={0.2} color="#ffffff" />
    </>
  );
}

// Typing effect hook
function useTypingEffect(words: string[], speed = 100, pause = 1500) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex(i => (i + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);

  return displayText;
}

export default function Hero3D() {
  const mouse = useRef<[number, number]>([0, 0]);
  const heroRef = useRef<HTMLDivElement>(null);

  const typingText = useTypingEffect(
    ["Scalable Web Apps", "3D Experiences", "Performant APIs", "Clean Interfaces"],
    80,
    2000
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    ];
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={["#060a10"]} />
          <fog attach="fog" args={["#060a10", 15, 35]} />
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          <CameraRig mouse={mouse} />
          <SceneLighting />
          <Suspense fallback={null}>
            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <Particles count={1500} mouse={mouse} />
            <NeonGrid />
            <FloatingGeometry />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(230 25% 4% / 0.6) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow inline-block" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4 leading-none"
        >
          <span className="text-foreground">Atharva </span>
        
          <span className="text-gradient">Agrawal</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-lg sm:text-xl font-mono text-neon-cyan text-glow-cyan">
            &lt; Full Stack Developer /&gt;
          </p>
        </motion.div>

        {/* Typing tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-lg sm:text-xl text-muted-foreground">
            Building{" "}
            <span className="text-neon-purple font-semibold">
              {typingText}
              <span className="text-neon-cyan animate-pulse">|</span>
            </span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="btn-neon-solid px-8 py-3 rounded-lg text-sm font-mono tracking-wider uppercase"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-neon px-8 py-3 rounded-lg text-sm font-mono tracking-wider uppercase"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/alpha08-prog", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/atharva-agrawal-172421330/", label: "LinkedIn" },
            
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-full border border-foreground/10 hover:border-neon-cyan/50 text-muted-foreground hover:text-neon-cyan transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          aria-label="Scroll to about"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ArrowDown size={16} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
