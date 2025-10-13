"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import CVContent from "@/components/CVContent";

export default function ProfilePage() {
  const t = useTranslations("CV");
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "CV-Josue-Torres-Narvaez",
    pageStyle: `
      @page {
        size: auto;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <main className="min-h-screen text-text p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-8 flex justify-end">
          <Button onClick={handlePrint} className="secondary text-white font-bold">
            {t("donwloadCV")}
            <Download className="mr-2 h-4 w-4" />
          </Button>
        </div>
        <CVContent ref={componentRef} />
      </div>
    </main>
  );
}