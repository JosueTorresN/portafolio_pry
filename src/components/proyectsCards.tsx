// components/CardsContainer.tsx
import React from "react";
import { CourseProps, ProjectProps } from "@/props/types";
import { useTranslations } from "next-intl";
import ProyectCard from "./proyectCard";

const CardsContainer: React.FC = () => {
  const t = useTranslations("Courses");
  const numberOfCourses = parseInt(t("cont"), 10); // 👈 Asegúrate de que este número sea el correcto

  const getProjects = (courseIndex: number): CourseProps["projects"] => {
    const projects: ProjectProps[] = [];
    const numberOfProjects = parseInt(t(`${courseIndex}.works.cont`), 10);
    for (let j = 1; j <= numberOfProjects; j++) {
      const project = {
        title: t(`${courseIndex}.works.${j}.title`),
        tipe: t(`${courseIndex}.works.${j}.tipe`),
        description: t(`${courseIndex}.works.${j}.description`),
        image: t(`${courseIndex}.works.${j}.image`),
        date: t(`${courseIndex}.works.${j}.date`),
        technologies: t(`${courseIndex}.works.${j}.tech`).split("*") as unknown as string[],
        repositoryLink: t(`${courseIndex}.works.${j}.repository`),
        liveDemoLink: t(`${courseIndex}.works.${j}.link`),
      };
      projects.push(project);
    }
    return projects;
  };

  const getCourses = (): CourseProps[] => {
    const items: CourseProps[] = [];

    // Ahora usamos un bucle for que no fallará
    for (let i = 1; i <= numberOfCourses; i++) {
      const course: CourseProps = {
        code: t(`${i}.code`),
        name: t(`${i}.name`),
        semster: t(`${i}.semester`),
        description: t(`${i}.description`),
        projects: getProjects(i),
      };
      items.push(course);
    }

    return items;
  };

  const courses = getCourses();

  return (
    <section className="flex flex-col items-center justify-center p-8" id="courses">
      <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
      <p className="mb-6 text-center max-w-2xl">{t("description")}</p>
      <div className="w-1/2 
      min-h-[2rem] 
      max-h-[100vh] 
      overflow-y-auto 
      p-4 
      rounded-lg 
      shadow-lg 
      scrollbar-thin 
      scrollbar-track-transparent 
      scrollbar-thumb-transparent 
      hover:scrollbar-thumb-gray-400
      surface-offset 
      border-color">
        {courses.map((course, index) => (
          <ProyectCard
            key={course.code || `course-${index}`}
            code={course.code}
            name={course.name}
            semster={course.semster}
            description={course.description}
            projects={course.projects || []}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsContainer;