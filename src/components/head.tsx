import Head from "next/head";

export default function Home() {
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
    "image": "/profile.jpg",
    "url": "https://tusitio.com",
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
    "email": "mailto:contacto@tusitio.com"
  };

  return (
    <Head>
    <title>Perfil de Josué Torres Narvaez</title>
    <meta name="description" content="Ingeniero en Computación, especializado en Ciberseguridad e Inteligencia Artificial." />
    {/* Aquí inyectamos el JSON-LD */}
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    </Head>
  );
}
