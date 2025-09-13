import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import Head from "@/components/head";
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
  title: "My Portfolio",
  description: "This is my personal portfolio where I share my projects and experiences.",
};

// type params = Promise<{ locale: "en" | "es"; }>;

// Define una interfaz para las props del Layout
interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) { // Usa la nueva interfaz aquí

  // Ahora puedes acceder a 'locale' de forma segura
  const { locale } = await params;

  const allowedLocales = ["en", "es"];

  // Ya no necesitas 'as any' porque TypeScript sabe que 'locale' es un string
  // if (!routing.locales.includes(locale)) {
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}> {/* Es una buena práctica poner el locale en la etiqueta html */}
      <Head />
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