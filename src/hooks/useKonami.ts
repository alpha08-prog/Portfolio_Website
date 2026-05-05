import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Listens for the Konami code anywhere on the page and fires `onTrigger` once matched.
 * Resets on any out-of-sequence keypress. Ignored while the user is typing in an input.
 */
export function useKonami(onTrigger: () => void) {
  const indexRef = useRef(0);
  const handlerRef = useRef(onTrigger);
  handlerRef.current = onTrigger;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      const expected = SEQUENCE[indexRef.current];
      const pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (pressed === expected) {
        indexRef.current += 1;
        if (indexRef.current === SEQUENCE.length) {
          indexRef.current = 0;
          handlerRef.current();
        }
      } else {
        // If they pressed the first character of the sequence, restart from index 1.
        indexRef.current = pressed === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
