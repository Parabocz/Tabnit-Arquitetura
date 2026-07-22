import Image from "next/image";
import { business, projects } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-sand py-24 lg:py-32">
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

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.1}>
              <article className="group">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.name} — projeto residencial de alto padrão pela Tabnit Arquitetura`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl text-ink">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {project.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
