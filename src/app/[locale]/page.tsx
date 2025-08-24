'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const t = useTranslations("Homepage");
  // localStorage.setItem("theme", "dark");

  // useEffect(() => {
  //   const theme = localStorage.getItem("theme");

  //   if (theme) {
  //     document.documentElement.classList.add(theme);
  //   } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.add("light");
  //   }
  // }, []);

  return (
    <div className="w-screen font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />
      <h1>{t("title")}</h1>
      <p>{t("welcomeMessage")}</p>
      <Footer />
    </div>
  );
}