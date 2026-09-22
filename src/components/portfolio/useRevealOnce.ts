import { useEffect, useRef, useState } from "react";

/**
 * One IntersectionObserver per root margin is shared by every reveal on the
 * page, so a few hundred animated words cost a single observer instead of one
 * component (and one animation driver) each.
 */
const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, () => void>();

function getObserver(margin: string) {
  const existing = observers.get(margin);
  if (existing) return existing;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
      }
    },
    { rootMargin: margin },
  );

  observers.set(margin, observer);
  return observer;
}

export function useRevealOnce<T extends Element>(margin = "-80px") {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = getObserver(margin);
    callbacks.set(element, () => setRevealed(true));
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      callbacks.delete(element);
    };
  }, [margin, revealed]);

  return [ref, revealed] as const;
}
