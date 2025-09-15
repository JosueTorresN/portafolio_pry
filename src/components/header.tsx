'use client';
import { useEffect, useState } from "react";
import ThemeToggle from "./themeToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky z-50 bg-white dark:bg-gray-900">
      {/* Navbar fijo */}
      <div className="py-4 px-8 sm:px-20 flex justify-between items-center border-b">
        <span className="font-semibold">My Portfolio</span>

        {/* Botón hamburguesa SOLO visible en móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navegación normal (oculta en móvil) */}
        <nav className="hidden sm:flex space-x-4">
          <Link href="/" className="underline-color decoration-4 hover:underline">
            {t("home")}
          </Link>
          <Link href="/#courses" className="underline-color decoration-4 hover:underline">
            {t("courses")}
          </Link>
          <Link href="/#contact" className="underline-color decoration-4 hover:underline">
            {t("info")}
          </Link>
          <Link href="/#recomendation" className="underline-color decoration-4 hover:underline">
            {t("recomendation")}
          </Link>
          <Link href="/proyects" className="underline-color decoration-4 hover:underline">
            {t("proyect")}
          </Link>
          <Link href="/hobbies" className="underline-color decoration-4 hover:underline">
            {t("hobbies")}
          </Link>
          <Link href="/block" className="underline-color decoration-4 hover:underline">
            {t("blog")}
          </Link>
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col space-y-2 px-8 py-4 border-b">
          <Link href="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("home")}
          </Link>
          <Link href="/#courses" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("courses")}
          </Link>
          <Link href="/#contact" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("info")}
          </Link>
          <Link href="/#recomendation" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("recomendation")}
          </Link>
          <Link href="/proyects" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("proyect")}
          </Link>
          <Link href="/hobbies" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("hobbies")}
          </Link>
          <Link href="/block" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {t("blog")}
          </Link>
          <div className="flex items-center space-x-4 pt-4 border-t">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      )}

      {/* Info personal */}
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
            <a
              href="mailto:jtn1999@outlook.com"
              className="hover:underline underline-color decoration-4"
            >
              jtn1999@outlook.com
            </a>
            <a
              href="https://linkedin.com"
              className="hover:underline underline-color decoration-4"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
