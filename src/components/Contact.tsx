import { business } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    business.address.full
  )}&output=embed`;

  return (
    <section id="contato" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-bronze">
              Contato
            </p>
            <h2 className="font-serif text-3xl leading-tight text-sand sm:text-4xl">
              Vamos conversar sobre o seu projeto
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-6 text-sand/85">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand/50">Endereço</dt>
                <dd className="mt-2 text-base leading-relaxed">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                  <br />
                  {business.address.zip}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand/50">Telefone</dt>
                <dd className="mt-2">
                  <a href={business.phoneHref} className="text-base hover:text-bronze cursor-pointer">
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand/50">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={business.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base hover:text-bronze cursor-pointer"
                  >
                    {business.instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-bronze px-7 py-3.5 text-sm font-medium tracking-wide text-sand transition-opacity hover:opacity-90 cursor-pointer"
              >
                Falar no WhatsApp
              </a>
              <a
                href={business.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-sand/40 px-7 py-3.5 text-sm font-medium tracking-wide text-sand transition-colors hover:border-sand cursor-pointer"
              >
                Linktree
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15} className="h-full min-h-[360px] w-full overflow-hidden border border-sand/15 grayscale contrast-125 sm:min-h-[440px]">
            <iframe
              title={`Mapa - ${business.name}`}
              src={mapSrc}
              className="h-full w-full min-h-[360px] border-0 sm:min-h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
