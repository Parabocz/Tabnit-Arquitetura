"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { animate, onScroll } from "animejs";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { team } from "@/lib/content";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

function TeamCardContent({
  member,
  animateReveal = false,
}: {
  member: (typeof team)[number];
  animateReveal?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateReveal) return;
    const cardEl = cardRef.current;
    const textEl = textRef.current;
    if (!cardEl || !textEl) return;

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    textEl.style.opacity = "0";
    const animation = animate(textEl, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 600,
      ease: "outExpo",
      autoplay: onScroll({ target: cardEl, enter: "bottom 82%" }),
    });

    return () => {
      animation.pause();
    };
  }, [animateReveal]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col overflow-hidden bg-ink sm:flex-row sm:overflow-visible"
    >
      <div className="relative h-64 w-full shrink-0 overflow-hidden bg-charcoal sm:h-auto sm:w-[38%]">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}, da Tabnit Arquitetura`}
          fill
          sizes="(min-width: 640px) 38vw, 100vw"
          style={{ objectPosition: member.facePosition }}
          className="object-cover"
        />
      </div>
      <div ref={textRef} className="flex flex-col justify-center p-8 lg:p-12">
        <p className="font-serif text-2xl text-sand lg:text-3xl">
          <span className="text-bronze">{member.label}</span> {member.name}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.15em] text-sand/50">{member.role}</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/80 lg:text-base">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

// Fallback estático para quem prefere menos movimento — mesma informação, sem o efeito de pilha ao rolar.
function TeamStaticGrid() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {team.map((member) => (
        <div key={member.name}>
          <TeamCardContent member={member} />
        </div>
      ))}
    </div>
  );
}

export default function TeamStack() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <TeamStaticGrid />;
  }

  return (
    <ScrollStack
      useWindowScroll
      itemDistance={120}
      itemScale={0.02}
      itemStackDistance={24}
      baseScale={0.88}
      stackPosition="18%"
      scaleEndPosition="8%"
    >
      {team.map((member) => (
        <ScrollStackItem key={member.name}>
          <TeamCardContent member={member} animateReveal />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
