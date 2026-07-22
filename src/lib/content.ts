// Conteúdo real da Tabnit Arquitetura — extraído do Perfil Google Meu Negócio e Instagram (@tabnit.arquitetura).
// Não inventar dados novos aqui: qualquer adição deve vir de uma fonte real verificada.

export const business = {
  name: "Tabnit Arquitetura",
  tagline: "Architectural Designer",
  city: "Ponta Grossa - PR",
  category: "Arquiteto",
  rating: 5.0,
  reviewCount: 21,
  phone: "(42) 99969-9469",
  phoneHref: "tel:+5542999699469",
  whatsappHref: "https://wa.me/5542999699469",
  address: {
    line1: "Av. Monteiro Lobato, 1600 - Sl 7",
    line2: "Jardim Carvalho, Ponta Grossa - PR",
    zip: "84015-480",
    full: "Av. Monteiro Lobato, 1600 - Sl 7 - Jardim Carvalho, Ponta Grossa - PR, 84015-480",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Av.+Monteiro+Lobato,+1600+-+Sl+7+-+Jardim+Carvalho,+Ponta+Grossa+-+PR,+84015-480",
  },
  instagram: {
    handle: "@tabnit.arquitetura",
    href: "https://www.instagram.com/tabnit.arquitetura",
    followers: 4027,
    posts: 290,
  },
  linktree: "https://linktr.ee/tabnit.arquitetura",
} as const;

export const architects = [
  {
    name: "Janayne Holodivski",
    role: "Arquiteta",
  },
  {
    name: "Rafa Medeiro",
    role: "Arquiteta",
  },
] as const;

export const differentiators = [
  {
    title: "Empresa de empreendedoras",
    description:
      "A Tabnit se identifica como uma empresa formada por empreendedoras, à frente de cada etapa do projeto.",
  },
  {
    title: "Acessibilidade completa",
    description:
      "Banheiro e estacionamento com acessibilidade para cadeira de rodas, no escritório em Ponta Grossa.",
  },
  {
    title: "Banheiro de gênero neutro",
    description: "Um espaço de atendimento pensado para receber todas as pessoas.",
  },
  {
    title: "Agendamento on-line",
    description:
      "Marque sua conversa inicial sem burocracia, direto pelo Google ou WhatsApp.",
  },
] as const;

export const services = [
  {
    title: "Arquitetura Residencial de Alto Padrão",
    description:
      "Projetos autorais do terreno à entrega — fachadas modernas, integração com paisagismo e soluções sob medida para cada família.",
  },
  {
    title: "Projetos de Interiores",
    description:
      "Interiores sofisticados com iluminação autoral, curadoria de materiais e ambientes que traduzem a identidade de quem mora.",
  },
] as const;

// Projetos em destaque no Instagram — usados como categorias da galeria.
// Sem acesso às fotos reais: imagens abaixo são placeholders de arquitetura de alto padrão, a serem substituídas pelas fotos originais.
export const projects = [
  {
    slug: "casa-pk",
    name: "Casa PK",
    description: "Residência de alto padrão com fachada contemporânea e integração ao paisagismo.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "casa-tv",
    name: "Casa TV",
    description: "Interiores sofisticados com iluminação autoral e materiais de curadoria.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "casa-em",
    name: "Casa EM",
    description: "Projeto residencial com volumetria marcante e amplos vãos envidraçados.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "casa-cm",
    name: "Casa CM",
    description: "Fachada moderna em harmonia com o entorno e áreas de convívio abertas.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "casa-rf",
    name: "Casa RF",
    description: "Ambientes internos com paleta neutra e luz natural como protagonista.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "projeto-canaan",
    name: "Projeto Canaan",
    description: "Arquitetura autoral pensada para o alto padrão de vida ao ar livre.",
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "casa-fd",
    name: "Casa FD",
    description: "Integração entre arquitetura e paisagismo em projeto residencial completo.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

export const testimonials = [
  {
    name: "Meri Gomes de Abreu",
    rating: 5,
    quote:
      "A arquiteta Janayne foi muito atenciosa e pontual, entendeu exatamente o que eu precisava. Recomendo com confiança.",
  },
  {
    name: "Luis Andrei Ferreira",
    rating: 5,
    quote:
      "Colaboração surpreendente do início ao fim, entrega no prazo e resultado sensacional.",
  },
  {
    name: "Eduarda Schram Ramos",
    rating: 5,
    quote:
      "Trabalho excelente, profissionais muito qualificadas. Indico de olhos fechados.",
  },
] as const;

export const heroImage =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop";

export const aboutImage =
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1600&auto=format&fit=crop";
