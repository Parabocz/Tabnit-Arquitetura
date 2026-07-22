import Image from "next/image";
import { aboutImage, architects, business } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
              Sobre a Tabnit
            </p>
            <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
              Uma empresa de empreendedoras, dedicada ao alto padrão em {business.city}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-charcoal">
              A Tabnit Arquitetura se identifica como uma empresa formada por empreendedoras,
              à frente de cada projeto do primeiro esboço à entrega das chaves. Especializada
              em arquitetura residencial e de interiores de alto padrão, a equipe constrói
              cada casa a partir da forma como cada família realmente vive.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {architects.map((architect) => (
                <div key={architect.name}>
                  <p className="font-serif text-lg text-ink">{architect.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{architect.role}</p>
                </div>
              ))}
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
    </section>
  );
}
