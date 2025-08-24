import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Cargar preferencia guardada o del sistema
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.documentElement.classList.add(theme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //     document.documentElement.classList.toggle("dark", storedTheme === "dark");
  //   } else {
  //     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //     setTheme(prefersDark ? "dark" : "light");
  //     document.documentElement.classList.toggle("dark", prefersDark);
  //   }
  // }, []);

  // Cambiar tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-200  hover:scale-110 transition-transform toggle-button"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-800" />
      ) : (
        <Sun className="w-5 h-5 text-400" />
      )}
    </button>
  );
}
