"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
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

function TeamCardContent({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-ink sm:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-charcoal sm:h-full sm:w-[42%]">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}, da Tabnit Arquitetura`}
          fill
          sizes="(min-width: 640px) 40vw, 100vw"
          style={{ objectPosition: member.facePosition }}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-8 lg:p-12">
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
        <div key={member.name} className="h-[420px] sm:h-[280px]">
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
    <div className="h-[600px] overflow-hidden border border-border sm:h-[640px]">
      <ScrollStack
        className="h-full"
        itemDistance={80}
        itemScale={0.02}
        itemStackDistance={24}
        baseScale={0.88}
        stackPosition="18%"
        scaleEndPosition="8%"
      >
        {team.map((member) => (
          <ScrollStackItem key={member.name} itemClassName="h-[420px] sm:h-[280px]">
            <TeamCardContent member={member} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
