// components/CardsContainer.jsx
import React from 'react';
import { CoursesProps, CourseProps } from '@/props/types';
import { useTranslations } from 'next-intl';
import ProyectCard from './proyectCard';

const CardsContainer: React.FC = () => {
  const t = useTranslations("Courses");

  return (
    <div className="flex flex-col items-center justify-center p-8 0 min-h-screen">
      <div className="surface-offset border-color w-1/2 h-screen overflow-y-scroll p-4 rounded-lg shadow-lg">
          <ProyectCard
            key={t("code")}
            code={t("code")}
            name={t("name")}
            semster={t("semster")}
            description={t("description")}
          />
      </div>
    </div>
  );
};

export default CardsContainer;