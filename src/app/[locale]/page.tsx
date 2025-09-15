'use client';
import Footer from "@/components/footer";
import CardsContainer from "@/components/proyectsCards";
import Profile from "@/components/profile";
import RecommendationsSection from "@/components/recomendation";

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