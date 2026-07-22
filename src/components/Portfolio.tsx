"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { animate, spring, type JSAnimation } from "animejs";
import { business, projects } from "@/lib/content";
import Reveal from "@/components/Reveal";

const TOTAL = projects.length;

// Shortest signed step from `from` to `to` around a circle of `total` positions.
function shortestDelta(from: number, to: number, total: number) {
  let diff = (to - from) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

// Signed distance of `index` from `progress`, wrapped to the shortest way around the wheel.
function wrappedOffset(index: number, progress: number, total: number) {
  let diff = (index - progress) % total;
  diff = ((diff % total) + total) % total;
  if (diff > total / 2) diff -= total;
  return diff;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function Portfolio() {
  const progressRef = useRef(0);
  const [renderProgress, setRenderProgress] = useState(0);
  const [spacing, setSpacing] = useState(190);
  const animRef = useRef<JSAnimation | null>(null);
  const dragRef = useRef({ startX: 0, startProgress: 0, active: false, moved: false });

  useEffect(() => {
    const updateSpacing = () => {
      const w = window.innerWidth;
      setSpacing(w < 640 ? 145 : w < 1024 ? 190 : 230);
    };
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);

  useEffect(() => {
    return () => {
      animRef.current?.pause();
    };
  }, []);

  const commitProgress = useCallback((value: number) => {
    progressRef.current = value;
    setRenderProgress(value);
  }, []);

  const activeIndex = useMemo(() => {
    const r = Math.round(renderProgress) % TOTAL;
    return (r + TOTAL) % TOTAL;
  }, [renderProgress]);

  const settleTo = useCallback(
    (target: number) => {
      animRef.current?.pause();

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        commitProgress(target);
        return;
      }

      const state = { value: progressRef.current };
      animRef.current = animate(state, {
        value: target,
        duration: 700,
        ease: spring({ stiffness: 260, damping: 26, mass: 1 }),
        onUpdate: () => commitProgress(state.value),
      });
    },
    [commitProgress]
  );

  const goNext = useCallback(() => {
    settleTo(Math.round(progressRef.current) + 1);
  }, [settleTo]);

  const goPrev = useCallback(() => {
    settleTo(Math.round(progressRef.current) - 1);
  }, [settleTo]);

  const goToIndex = useCallback(
    (index: number) => {
      const current = Math.round(progressRef.current);
      settleTo(current + shortestDelta(current, index, TOTAL));
    },
    [settleTo]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    animRef.current?.pause();
    dragRef.current = { startX: e.clientX, startProgress: progressRef.current, active: true, moved: false };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    commitProgress(dragRef.current.startProgress - dx / spacing);
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    settleTo(Math.round(progressRef.current));
  };

  const onCardClick = (index: number) => {
    if (dragRef.current.moved) return;
    goToIndex(index);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const active = projects[activeIndex];

  return (
    <section id="portfolio" className="overflow-hidden bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
                Portfólio
              </p>
              <h2 className="max-w-xl font-serif text-3xl leading-tight text-ink sm:text-4xl">
                Projetos residenciais de alto padrão
              </h2>
            </div>
            <a
              href={business.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-wide text-charcoal underline decoration-border underline-offset-4 transition-colors hover:text-bronze cursor-pointer"
            >
              Ver mais no Instagram
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Galeria de projetos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative mt-16 h-[340px] touch-pan-y select-none rounded-none sm:h-[400px] lg:h-[460px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-8"
            style={{ perspective: "1400px" }}
          >
            {projects.map((project, index) => {
              const offset = wrappedOffset(index, renderProgress, TOTAL);
              const abs = Math.abs(offset);
              const isActive = index === activeIndex;
              const translateX = offset * spacing;
              const rotateY = offset * -20;
              const scale = Math.max(0.55, 1 - abs * 0.16);
              const translateZ = -abs * 90;
              const opacity = abs > 3.4 ? 0 : Math.max(0.16, 1 - abs * 0.32);

              return (
                <button
                  key={project.slug}
                  type="button"
                  aria-hidden={!isActive}
                  tabIndex={-1}
                  onClick={() => onCardClick(index)}
                  className="absolute left-1/2 top-1/2 w-40 cursor-pointer sm:w-56 lg:w-64"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(100 - abs),
                    pointerEvents: abs > 3.4 ? "none" : "auto",
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={`${project.name} — projeto residencial de alto padrão pela Tabnit Arquitetura`}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 160px"
                      className="object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-ink transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-label={`Ver ${project.name}`}
                aria-current={index === activeIndex}
                onClick={() => goToIndex(index)}
                className={`h-1.5 cursor-pointer transition-all ${
                  index === activeIndex ? "w-6 bg-bronze" : "w-1.5 bg-border hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-ink transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div aria-live="polite" className="relative mx-auto mt-8 max-w-md text-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: "absolute", inset: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-serif text-xl text-ink">{active.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
