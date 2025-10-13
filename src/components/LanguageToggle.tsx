"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "es" ? "en" : "es";

    const newPath = `/${newLocale}${pathname.startsWith('/') ? '' : '/'}${pathname.replace(/^\/(es|en)/, '')}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:scale-110 transition-transform toggle-button flex items-center gap-2"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">{locale.toUpperCase()}</span>
    </button>
  );
}
