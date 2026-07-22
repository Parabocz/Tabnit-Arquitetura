import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://tabnitarquitetura.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tabnit Arquitetura | Arquitetura de Alto Padrão em Ponta Grossa",
    template: "%s | Tabnit Arquitetura",
  },
  description:
    "Escritório de arquitetura de alto padrão em Ponta Grossa - PR, liderado por Janayne Holodivski e Rafa Medeiro. Projetos residenciais e de interiores autorais. Nota 5,0 com 21 avaliações.",
  keywords: [
    "arquitetura de alto padrão",
    "arquiteta Ponta Grossa",
    "projeto de interiores Ponta Grossa",
    "escritório de arquitetura Ponta Grossa",
    "Tabnit Arquitetura",
  ],
  authors: [{ name: "Tabnit Arquitetura" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Tabnit Arquitetura",
    title: "Tabnit Arquitetura | Arquitetura de Alto Padrão em Ponta Grossa",
    description:
      "Projetos residenciais e de interiores de alto padrão em Ponta Grossa - PR. Nota 5,0 com 21 avaliações.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabnit Arquitetura | Arquitetura de Alto Padrão em Ponta Grossa",
    description:
      "Projetos residenciais e de interiores de alto padrão em Ponta Grossa - PR.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
