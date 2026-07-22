"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";

export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }

    const counter = { value: 0 };
    const animation = animate(counter, {
      value: to,
      duration: 1400,
      ease: "outExpo",
      autoplay: onScroll({ target: el, enter: "bottom 90%" }),
      onUpdate: () => {
        el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
      },
    });

    return () => {
      animation.pause();
    };
  }, [to, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}
