"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProfileSection() {
  const t = useTranslations("CV");
  const sectionRef = useRef(null);
  const handlePrint = useReactToPrint({
    // ✅ Tipos correctos
    contentRef: sectionRef,
    documentTitle: "CV-Josue-Torres-Narvaez",
  });


  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <img
          src="/ruta-a-tu-foto.jpg"
          alt="Josué Torres Narvaez"
          className="w-32 h-32 mx-auto rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">Josué Torres Narvaez</h1>
        <p className="text-base">{t("carreer")} | TEC</p>
      </div>

      {/* Biografía */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">{t("profetionalBiography")}</h2>
          <p>
            {t("biograbhyDescription")}
          </p>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t("technicalSkills")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium">{t("languages")}</h3>
              <ul className="list-disc list-inside text-sm">
                <li>JavaScript / TypeScript</li>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Frameworks</h3>
              <ul className="list-disc list-inside text-sm">
                <li>React / Next.js</li>
                <li>Node.js</li>
                <li>TailwindCSS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">{t("tools")}</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Git / GitHub</li>
                <li>Docker</li>
                <li>SQL / NoSQL</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificaciones */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t("certyfications")}</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              {t("certyficationsList.1")} –{" "}
              <a
                href="https://www.netacad.com/"
                className="underline"
                target="_blank"
              >
                Cisco NetAcad
              </a>
            </li>
            <li>
              {t("certyficationsList.2")} –{" "}
              <a
                href="https://platzi.com/"
                className="underline"
                target="_blank"
              >
                Platzi
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Redes profesionales */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("contacts")}
          </h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/josué-torres-a92a801a3"
              target="_blank"
              className="flex items-center gap-2 hover:underline"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a
              href="https://github.com/tuusuario"
              target="_blank"
              className="flex items-center gap-2 hover:underline"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Botón de exportar a PDF */}
      <div className="text-center">
        <Button onClick={handlePrint}>{t("donwloadCV")}</Button>
      </div>
    </section>
  );
}
