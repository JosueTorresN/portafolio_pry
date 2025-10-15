
export default function ProfileSchema() {

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://porfoliotec.netlify.app";

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
    "url": `${siteUrl}/es`, 
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}