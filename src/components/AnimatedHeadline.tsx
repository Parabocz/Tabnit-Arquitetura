"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

export default function AnimatedHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = splitText(el, { words: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        split.revert();
      };
    }

    animate(split.words, {
      translateY: [24, 0],
      opacity: [0, 1],
      delay: stagger(50),
      duration: 700,
      ease: "outExpo",
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {text}
    </h1>
  );
}
