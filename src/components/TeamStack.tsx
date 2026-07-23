import Image from "next/image";
import { team } from "@/lib/content";
import Reveal from "@/components/Reveal";

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden bg-ink sm:flex-row">
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
      <div className="flex flex-col justify-center p-8 lg:p-12">
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

export default function TeamStack() {
  return (
    <div className="relative">
      {team.map((member, i) => (
        <div
          key={member.name}
          className="sticky"
          style={{ top: `${5 + i * 1.5}rem`, zIndex: i + 1 }}
        >
          <Reveal delay={i * 0.1}>
            <div className="border border-border">
              <TeamCard member={member} />
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
