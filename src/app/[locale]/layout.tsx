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

export const metadata: Metadata = {
  title: {
    template: '%s | Josué Torres Narvaez',
    default: 'Portafolio de Josué Torres Narvaez',
  },
  description: "This is my personal portfolio where I share my projects and experiences.",
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