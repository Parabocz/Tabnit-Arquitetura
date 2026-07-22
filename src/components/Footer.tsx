import { business } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-sand/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-12">
        <p className="font-serif text-base text-sand">
          Tabnit <span className="text-bronze">Arquitetura</span>
        </p>
        <p className="text-xs text-sand/50">
          © {year} {business.name}. {business.city}.
        </p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.15em] text-sand/60">
          <a
            href={business.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bronze cursor-pointer"
          >
            Instagram
          </a>
          <a
            href={business.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bronze cursor-pointer"
          >
            Linktree
          </a>
        </div>
      </div>
    </footer>
  );
}
