import Image from "next/image";
import { aboutImage, business, companyStory, team } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
                Sobre a Tabnit
              </p>
              <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
                Uma história de família a serviço de {business.city}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-charcoal">
                {companyStory.founding}
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal">
                {companyStory.philosophy}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-border pt-8">
                <p className="font-serif text-4xl text-bronze">{companyStory.stat.value}</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {companyStory.stat.label}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15} className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
              <Image
                src={aboutImage}
                alt="Interior de projeto residencial de alto padrão assinado pela Tabnit Arquitetura"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <div className="flex h-full flex-col bg-sand">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}, da Tabnit Arquitetura`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 lg:p-10">
                  <p className="font-serif text-xl text-ink">
                    <span className="text-bronze">{member.label}</span> {member.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal">{member.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
