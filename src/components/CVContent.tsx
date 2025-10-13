// components/CVContent.tsx
import React, { forwardRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
  Wrench,
  Award,
  BookOpen,
} from "lucide-react";

const SkillPill = ({ children }: { children: React.ReactNode }) => (
  <span className="surface-highlight text-xs font-medium px-3 py-1 rounded-full">
    {children}
  </span>
);

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <h2 className="text-xl font-bold mb-4 flex items-center gap-3 border-b-2 border-color pb-2">
    <Icon className="w-6 h-6 secondary-text" />
    {title}
  </h2>
);


const CVContent = forwardRef<HTMLDivElement>((props, ref) => {
  const t = useTranslations("CV");
  const skills = {
    languages: ["JavaScript / TypeScript", "Python", "Java", "C++"],
    frameworks: ["React / Next.js", "Node.js", "Express", "TailwindCSS"],
    tools: ["Git / GitHub", "Docker", "SQL / NoSQL", "Figma", "Firebase"],
  };

  // --- SOLUCIÓN AQUÍ ---
  // Construimos la URL completa de la imagen.
  const profileImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/body_profile.png`;
  // --------------------

  return (
    <div
      ref={ref}
      className="
        surface-offset text-foreground rounded-lg shadow-2xl overflow-hidden
        print:shadow-none print:rounded-none
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* --- COLUMNA IZQUIERDA (SIDEBAR) --- */}
        <aside className="
          md:col-span-4 p-6 primary
          print:bg-gray-100 print:text-black
        ">
          <div className="flex flex-col items-center text-center">
            
            <Image
              src={profileImageUrl}
              alt="Josué Torres Narvaez"
              width={150}
              height={150}
              unoptimized 
              className="rounded-full object-cover border-4 border-color shadow-lg"
            />
            {/* ------------------------ */}

            <h1 className="text-2xl font-bold mt-4">Josué Torres Narvaez</h1>
            <p className="secondary-text font-semibold">{t("carreer")}</p>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <a href="mailto:josuetorres@gmail.com" className="flex items-center gap-3 hover:secondary-text transition-colors">
              <Mail className="w-4 h-4" />
              <span>josuetorres@gmail.com</span>
            </a>
            <a href="tel:+50688888888" className="flex items-center gap-3 hover:secondary-text transition-colors">
              <Phone className="w-4 h-4" />
              <span>(+506) 8888-8888</span>
            </a>
            <a href="https://www.linkedin.com/in/josué-torres-a92a801a3" target="_blank" className="flex items-center gap-3 hover:secondary-text transition-colors">
              <Linkedin className="w-4 h-4" />
              <span>linkedin.com/in/josué-torres</span>
            </a>
            <a href="https://github.com/tuusuario" target="_blank" className="flex items-center gap-3 hover:secondary-text transition-colors">
              <Github className="w-4 h-4" />
              <span>github.com/tuusuario</span>
            </a>
          </div>
        </aside>

        {/* --- COLUMNA DERECHA (CONTENIDO PRINCIPAL) --- */}
        <main className="
          md:col-span-8 p-8
          print:text-black
        ">
          <section>
            <SectionTitle icon={User} title={t("profetionalBiography")} />
            <p className="text-sm leading-relaxed">{t("biograbhyDescription")}</p>
          </section>

          <section className="mt-8">
            <SectionTitle icon={Wrench} title={t("technicalSkills")} />
            <div className="space-y-4">
               <div>
                 <h3 className="font-semibold mb-2">{t("languages")}</h3>
                 <div className="flex flex-wrap gap-2">
                   {skills.languages.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}
                 </div>
               </div>
               <div>
                 <h3 className="font-semibold mb-2">Frameworks & Libraries</h3>
                 <div className="flex flex-wrap gap-2">
                   {skills.frameworks.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}
                 </div>
               </div>
               <div>
                 <h3 className="font-semibold mb-2">{t("tools")} & Platforms</h3>
                 <div className="flex flex-wrap gap-2">
                   {skills.tools.map((skill) => <SkillPill key={skill}>{skill}</SkillPill>)}
                 </div>
               </div>
             </div>
          </section>

          <section className="mt-8">
            <SectionTitle icon={Award} title={t("certyfications")} />
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                {t("certyficationsList.1")} –{" "}
                <a href="https://www.netacad.com/" className="underline-color decoration-2 hover:underline print:text-blue-600" target="_blank">
                  Cisco NetAcad
                </a>
              </li>
              <li>
                {t("certyficationsList.2")} –{" "}
                <a href="https://platzi.com/" className="underline-color decoration-2 hover:underline print:text-green-600" target="_blank">
                  Platzi
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
});

CVContent.displayName = "CVContent";

export default CVContent;