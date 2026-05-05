import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const LINES = [
  "$ sudo unlock --developer-mode",
  "[OK] kernel handshake established",
  "[OK] neon subsystem online",
  "[OK] you found the easter egg",
  "",
  "Welcome, fellow developer.",
  "Press / or ⌘K anywhere to open the command palette.",
];

type KonamiOverlayProps = {
  active: boolean;
  onDismiss: () => void;
};

export default function KonamiOverlay({ active, onDismiss }: KonamiOverlayProps) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!active) {
      setRevealed(0);
      return;
    }
    const id = setInterval(() => {
      setRevealed((r) => (r >= LINES.length ? r : r + 1));
    }, 220);
    return () => clearInterval(id);
  }, [active]);

  // Auto-dismiss after the sequence finishes.
  useEffect(() => {
    if (!active) return;
    if (revealed < LINES.length) return;
    const timer = setTimeout(onDismiss, 2400);
    return () => clearTimeout(timer);
  }, [active, revealed, onDismiss]);

  // Click-anywhere or Escape to dismiss early.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onDismiss]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onDismiss}
          role="dialog"
          aria-label="Developer mode unlocked"
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 cursor-pointer"
          style={{
            background: "rgba(6, 10, 16, 0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none scanlines opacity-60"
            aria-hidden="true"
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 18 }}
            className="relative w-full max-w-xl rounded-xl border border-neon-green/40 bg-background/80 p-5 sm:p-6 font-mono text-sm shadow-[0_0_60px_rgba(0,255,160,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neon-green/20 text-neon-green text-xs uppercase tracking-widest">
              <Terminal size={14} />
              <span>~/atharva-agrawal — developer mode</span>
              <span className="ml-auto text-neon-green/60">[OK]</span>
            </div>
            <div className="space-y-1.5 min-h-[180px]">
              {LINES.slice(0, revealed).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.startsWith("[OK]")
                      ? "text-neon-green"
                      : line.startsWith("$")
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {line || " "}
                  {i === revealed - 1 && revealed < LINES.length && (
                    <span className="inline-block w-2 h-3.5 ml-1 bg-neon-green align-middle animate-pulse" />
                  )}
                </motion.p>
              ))}
            </div>
            <p className="mt-4 pt-3 border-t border-neon-green/10 text-xs text-muted-foreground/70 text-center">
              click anywhere or press Esc to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
