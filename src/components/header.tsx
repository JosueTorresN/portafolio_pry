'use client';
import { useEffect, useState } from "react";
import ThemeToggle from "./themeToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing"
import  LanguageToggle  from "./LanguageToggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Header")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // cuando bajas más de 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky z-50">
      {/* Navbar fijo (arriba) */}
      <div className="py-4 px-8 sm:px-20 flex justify-between items-center border-b">
        <span className="font-semibold">My Portfolio</span>
        <nav>
          <Link href="/" className="underline-color decoration-4 mx-2 hover:underline">
            {t("home")}
          </Link>
          <Link href="/#courses" className="underline-color decoration-4 mx-2 hover:underline">
            {t("courses")}
          </Link>
          <Link href="/#contact" className="underline-color decoration-4 mx-2 hover:underline">
            {t("info")}
          </Link>
          <Link href="/#recomendation" className="underline-color decoration-4 mx-2 hover:underline">
            {t("recomendation")}
          </Link>
          <Link href="/proyects" className="underline-color decoration-4 mx-2 hover:underline">
            {t("proyect")}
          </Link>
          <Link href="/hobbies" className="underline-color decoration-4 mx-2 hover:underline">
            {t("hobbies")}
          </Link>
          <Link href="/block" className="underline-color decoration-4 mx-2 hover:underline">
            {t("blog")}
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>

      </div>

      {/* Info personal (debajo del navbar, se oculta al hacer scroll) */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
        }`}
      >
        <div className="py-6 px-8 sm:px-20 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-800 dark:text-200">
              Josué Torres Narvaez
            </h1>
            <p className="text-sm text-600 dark:text-400">
              {t("knowlaged1")} | {t("knowlaged2")} | {t("knowlaged3")}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <a href="mailto:jtn1999@outlook.com" className="hover:underline underline-color decoration-4">
              jtn1999@outlook.com
            </a>
            <a href="https://linkedin.com" className="hover:underline underline-color decoration-4">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
