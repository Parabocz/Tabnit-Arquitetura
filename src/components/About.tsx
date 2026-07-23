import Image from "next/image";
import { aboutImage, business, companyStory } from "@/lib/content";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import TeamStack from "@/components/TeamStack";

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
          </div>

          <div className="pb-40 lg:col-span-7">
            <Reveal delay={0.15} className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
                <Image
                  src={aboutImage}
                  alt="Interior de projeto residencial de alto padrão assinado pela Tabnit Arquitetura"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute left-6 right-6 top-full z-10 -translate-y-16 bg-ink p-6 sm:left-8 sm:right-auto sm:w-72 sm:p-8">
                <div className="border-t-2 border-bronze pt-4">
                  <CountUp
                    to={companyStory.stat.value}
                    prefix={companyStory.stat.prefix}
                    suffix={companyStory.stat.suffix}
                    className="font-serif text-3xl text-bronze sm:text-4xl"
                  />
                  <p className="mt-2 text-xs leading-relaxed text-sand/70 sm:text-sm">
                    {companyStory.stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
            Quem assina cada projeto
          </p>
          <h3 className="max-w-xl font-serif text-2xl leading-tight text-ink sm:text-3xl">
            Três pessoas, um mesmo compromisso com cada família
          </h3>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <TeamStack />
        </Reveal>
      </div>
    </section>
  );
}
