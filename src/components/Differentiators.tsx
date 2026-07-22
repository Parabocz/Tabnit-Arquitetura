import { differentiators } from "@/lib/content";
import Reveal from "@/components/Reveal";

const icons = [
  // empreendedoras
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" />
  </svg>,
  // acessibilidade
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
    <circle cx="12" cy="5" r="1.75" fill="currentColor" stroke="none" />
    <path d="M5 9h14M12 9v5m0 0l-4 7m4-7l4 7M8 12l8-1" />
  </svg>,
  // genero neutro
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
    <circle cx="10" cy="9" r="4.25" />
    <path d="M17 3l3.5 3.5M20.5 3v3.5H17M10 13.25V21m-3-3.5h6" />
  </svg>,
  // agendamento online
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
    <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M8.5 14l2 2 4-4" />
  </svg>,
];

export default function Differentiators() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
            Diferenciais
          </p>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Um escritório pensado para acolher todas as pessoas
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="text-ink">
                {icons[i]}
                <h3 className="mt-5 font-serif text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
