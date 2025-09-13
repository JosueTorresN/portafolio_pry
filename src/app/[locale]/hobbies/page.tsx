"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {translationsHobbies} from "@/utils/traslationList";

export default function HobbiesPage() {
  const hobbies = translationsHobbies();
  const t = useTranslations("Hobbies");

  return (
    <main className="min-h-screen bg-bg text-text p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">{t("title")}</h2>
          <p className="text-sm text-text-offset">
            {t("description")} 🎮📚
          </p>
        </div>

        {/* Hobbies en vertical */}
        <section className="grid gap-6">
          {hobbies.map((hobby) => (
            <article
              key={hobby.id}
              className="bg-bg-offset p-6 rounded-lg shadow-sm border border-border"
            >
              <img
                src={hobby.image}
                alt={hobby.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-text">{hobby.title}</h3>
              <p className="text-sm text-text-offset">{hobby.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
