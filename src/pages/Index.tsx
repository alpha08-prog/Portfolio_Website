import { lazy, Suspense, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import KonamiOverlay from "@/components/KonamiOverlay";
import { useKonami } from "@/hooks/useKonami";

// Lazy load heavy 3D sections for performance
const Hero3D = lazy(() => import("@/components/Hero3D"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const Timeline = lazy(() => import("@/components/Timeline"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [konamiActive, setKonamiActive] = useState(false);
  useKonami(() => setKonamiActive(true));

  return (
    <main className="relative">
      {/* Skip to content for keyboard users */}
      <a href="#about" className="skip-to-content">Skip to content</a>

      {/* Cmd+K command palette (global) */}
      <CommandPalette onTriggerKonami={() => setKonamiActive(true)} />
      <KonamiOverlay active={konamiActive} onDismiss={() => setKonamiActive(false)} />

      {/* Navigation */}
      <Navigation />

      {/* Hero - full screen 3D */}
      <Suspense fallback={<div className="h-screen bg-background" />}>
        <Hero3D />
      </Suspense>

      {/* About with rotating tech sphere */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      {/* Projects grid */}
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>

      {/* Skills orbit */}
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>

      {/* Experience timeline */}
      <Suspense fallback={<SectionLoader />}>
        <Timeline />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>

      {/* Contact */}
      <Suspense fallback={<SectionLoader />}>
        <ContactForm />
      </Suspense>

      {/* Footer */}
      <Footer />
    </main>
  );
}
