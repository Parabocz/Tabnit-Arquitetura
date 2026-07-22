import Image from "next/image";
import { business, heroImage } from "@/lib/content";
import Reveal from "@/components/Reveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <Image
        src={heroImage}
        alt="Fachada de residência de alto padrão projetada pela Tabnit Arquitetura"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-sand/70">
            {business.category} · {business.city}
          </p>
        </Reveal>
        <AnimatedHeadline
          text="Arquitetura de alto padrão que traduz o modo de viver de cada família"
          className="max-w-3xl font-serif text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand/80 sm:text-lg">
            Projetos residenciais e de interiores autorais, assinados por Janayne Holodivski,
            Rafaelle Medeiro e Fabrício Garcia em Ponta Grossa - PR.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center bg-bronze px-7 py-3.5 text-sm font-medium tracking-wide text-sand transition-opacity hover:opacity-90 cursor-pointer"
            >
              Agendar uma conversa
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center border border-sand/40 px-7 py-3.5 text-sm font-medium tracking-wide text-sand transition-colors hover:border-sand cursor-pointer"
            >
              Ver portfólio
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
