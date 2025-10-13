// app/page.tsx

import type { Metadata } from "next";

// Define tu objeto JSON-LD aquí. Es una buena práctica usar una URL absoluta.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://porfoliotec.netlify.app/es"; // Configura esto en .env.local

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Josué Torres Narvaez",
  "givenName": "Josué",
  "familyName": "Torres Narvaez",
  "jobTitle": "Ingeniero en Computación",
  "worksFor": {
    "@type": "Organization",
    "name": "Instituto Tecnológico de Costa Rica (TEC)"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Instituto Tecnológico de Costa Rica (TEC)"
  },

  "image": `${siteUrl}/body_profile.png`,
  "url": siteUrl,
  "sameAs": [
    "https://www.linkedin.com/in/josué-torres-a92a801a3"
  ],
  "nationality": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  "knowsAbout": [
    "Ciberseguridad",
    "Inteligencia Artificial",
    "Desarrollo Web",
    "Videojuegos"
  ],
  "email": "mailto:jtn1999@outlook.com"
};

// Exporta el objeto metadata
export const metadata: Metadata = {
  title: "Perfil de Josué Torres Narvaez",
  description: "Ingeniero en Computación, especializado en Ciberseguridad e Inteligencia Artificial.",
  // Aquí se inyectan los scripts y otros elementos en el <head>
  other: {
    // La clave del objeto es el `type` del script
    "application/ld+json": JSON.stringify(jsonLd),
  },
};
