'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CardsContainer from "@/components/proyectsCards";

export default function Home() {
  const t = useTranslations("Homepage");

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] transition-all duration-500">
      <Header />
      <div>
        <main>
          <h1>{t("title")}</h1>
          <p>{t("welcomeMessage")}</p>
          <div>
            <CardsContainer/>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}