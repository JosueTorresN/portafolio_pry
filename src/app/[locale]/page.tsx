'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Footer from "@/components/footer";
import CardsContainer from "@/components/proyectsCards";
import Profile from "@/components/profile";
import RecommendationsSection from "@/components/recomendation";

export default function Home() {

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] transition-all duration-500">
      <div>
        <main className="space-y-20"> {/* 👈 agrega separación vertical */}
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