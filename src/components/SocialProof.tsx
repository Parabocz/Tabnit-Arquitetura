import { business, testimonials } from "@/lib/content";
import Reveal from "@/components/Reveal";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <section id="depoimentos" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-bronze">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-6 w-6" />
              ))}
            </div>
            <p className="mt-5 font-serif text-4xl text-sand sm:text-5xl">
              {business.rating.toFixed(1)}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-sand/60">
              {business.reviewCount} avaliações no Google
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-sand/15 p-8">
                <div className="flex gap-1 text-bronze">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <StarIcon key={idx} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-sand/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium tracking-wide text-sand/60">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
