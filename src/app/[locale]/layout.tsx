import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://porfoliotec.netlify.app/es";

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

export const metadata: Metadata = {
  title: "Perfil de Josué Torres Narvaez",
  description: "Ingeniero en Computación, especializado en Ciberseguridad e Inteligencia Artificial.",

  other: {

    "application/ld+json": JSON.stringify(jsonLd),
  },
};

// Define una interfaz para las props del Layout
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {

  const { locale } = await params;

  const allowedLocales = ["en", "es"];

  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>

      <NextIntlClientProvider locale={locale} messages={messages}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}