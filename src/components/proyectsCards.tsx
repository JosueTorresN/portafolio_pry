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
    <section className="flex flex-col items-center justify-center p-8 min-h-screen">
      <div className="surface-offset border-color w-1/2 h-screen overflow-y-scroll scrollbar-hide p-4 rounded-lg shadow-lg">
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