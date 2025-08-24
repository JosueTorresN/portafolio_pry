import { useEffect, useState } from "react";
import ThemeToggle from "./themeToggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // cuando bajas más de 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      {/* Navbar fijo (arriba) */}
      <div className="py-4 px-8 sm:px-20 flex justify-between items-center border-b">
        <span className="font-semibold">My Portfolio</span>
        <nav>
          <a href="#about" className="mx-2 hover:underline">
            About
          </a>
          <a href="#projects" className="mx-2 hover:underline">
            Projects
          </a>
          <a href="#contact" className="mx-2 hover:underline">
            Contact
          </a>
        </nav>
        <ThemeToggle />
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
              Juan Gómez
            </h1>
            <p className="text-sm text-600 dark:text-400">
              Ingeniero en IA | Ciberseguridad | Desarrollador Web
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <a href="mailto:correo@ejemplo.com" className="hover:underline">
              correo@ejemplo.com
            </a>
            <a href="https://linkedin.com" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
