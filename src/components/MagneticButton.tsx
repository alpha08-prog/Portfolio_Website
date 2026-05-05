import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  /** How far the button drifts toward the cursor (0–0.5 reasonable). */
  strength?: number;
  ariaLabel?: string;
};

/**
 * A button that drifts subtly toward the cursor on hover.
 * Disabled on touch / coarse pointers and for users with prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  onClick,
  className,
  type = "button",
  strength = 0.25,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    // Skip on coarse pointers (touch). matchMedia is safe in browsers.
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </motion.button>
  );
}
