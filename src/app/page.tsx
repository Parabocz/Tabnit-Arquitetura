import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import SocialProof from "@/components/SocialProof";
import Differentiators from "@/components/Differentiators";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { business } from "@/lib/content";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Architect",
    name: business.name,
    telephone: business.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      postalCode: business.address.zip,
      addressCountry: "BR",
    },
    sameAs: [business.instagram.href, business.linktree],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <SocialProof />
        <Differentiators />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
