import { services } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Services() {
  return (
    <section id="servicos" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
            Serviços
          </p>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-sand sm:text-4xl">
            Do projeto arquitetônico aos interiores, uma visão única do início ao fim
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-sand/15 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="group h-full border-sand/15 bg-ink p-10 transition-colors hover:bg-charcoal/40 md:border-l md:first:border-l-0 lg:p-14">
                <span className="font-serif text-sm text-bronze">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl text-sand">{service.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-sand/70">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
