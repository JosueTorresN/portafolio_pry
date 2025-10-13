
import type { Metadata } from "next";
import Footer from "@/components/footer";
import CardsContainer from "@/components/proyectsCards";
import Profile from "@/components/profile";
import RecommendationsSection from "@/components/recomendation";

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


export const metadata: Metadata = {
  title: "Perfil de Josué Torres Narvaez",
  description: "Ingeniero en Computación, especializado en Ciberseguridad e Inteligencia Artificial.",
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
  },
};

export default function Home() {

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] transition-all duration-500 last:mb-20">
      <div className="mb-10 md:mb-20">
        <main className="space-y-20">
          <div>
            <CardsContainer />
          </div>
          <div>
            <Profile />
          </div>
          <RecommendationsSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}