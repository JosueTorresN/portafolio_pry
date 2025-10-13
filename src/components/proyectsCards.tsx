// components/CardsContainer.tsx
import React from "react";
import { CourseProps, ProjectProps } from "@/props/types";
import { useTranslations } from "next-intl";
// ¡Asegúrate de que el nombre del import coincida con el nuevo nombre del archivo!
import ProyectCard from "./proyectCard";

const CardsContainer: React.FC = () => {
  const t = useTranslations("Courses");
  const numberOfCourses = parseInt(t("cont"), 10);

  const getProjects = (courseIndex: number): CourseProps["projects"] => {
    const projects: ProjectProps[] = [];
    // Ojo: Si 'cont' no existe, esto dará NaN. Es mejor manejarlo.
    const numberOfProjects = parseInt(t(`${courseIndex}.works.cont`), 10) || 0; 
    for (let j = 1; j <= numberOfProjects; j++) {
      const project = {
        title: t(`${courseIndex}.works.${j}.title`),
        tipe: t(`${courseIndex}.works.${j}.tipe`),
        description: t(`${courseIndex}.works.${j}.description`),
        image: t(`${courseIndex}.works.${j}.image`),
        date: t(`${courseIndex}.works.${j}.date`),
        // El 'as unknown as string[]' es un poco riesgoso, pero lo mantengo como estaba
        technologies: t(`${courseIndex}.works.${j}.tech`).split("*").filter(Boolean) as unknown as string[],
        repositoryLink: t(`${courseIndex}.works.${j}.repository`),
        liveDemoLink: t(`${courseIndex}.works.${j}.link`),
      };
      projects.push(project);
    }
    return projects;
  };

  const getCourses = (): CourseProps[] => {
    const items: CourseProps[] = [];

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
    <section className="flex flex-col items-center justify-center p-4 sm:p-8" id="courses">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("title")}</h2>
      <p className="mb-6 text-center max-w-2xl px-2">{t("description")}</p>

      <div
        className="
          w-full sm:w-3/4 lg:w-1/2
          min-h-[2rem] 
          max-h-[60vh] // Aumenté un poco la altura máxima para mejor visibilidad
          overflow-y-auto 
          p-4 
          rounded-lg 
          shadow-lg 
          scrollbar-thin 
          scrollbar-track-transparent 
          scrollbar-thumb-transparent 
          hover:scrollbar-thumb-gray-400
          surface-offset 
          border-color
        "
      >
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









// // components/CardsContainer.tsx
// import React from "react";
// import { CourseProps, ProjectProps } from "@/props/types";
// import { useTranslations } from "next-intl";
// import ProyectCard from "./proyectCard";

// const CardsContainer: React.FC = () => {
//   const t = useTranslations("Courses");
//   const numberOfCourses = parseInt(t("cont"), 10);

//   const getProjects = (courseIndex: number): CourseProps["projects"] => {
//     const projects: ProjectProps[] = [];
//     const numberOfProjects = parseInt(t(`${courseIndex}.works.cont`), 10);
//     for (let j = 1; j <= numberOfProjects; j++) {
//       const project = {
//         title: t(`${courseIndex}.works.${j}.title`),
//         tipe: t(`${courseIndex}.works.${j}.tipe`),
//         description: t(`${courseIndex}.works.${j}.description`),
//         image: t(`${courseIndex}.works.${j}.image`),
//         date: t(`${courseIndex}.works.${j}.date`),
//         technologies: t(`${courseIndex}.works.${j}.tech`).split("*") as unknown as string[],
//         repositoryLink: t(`${courseIndex}.works.${j}.repository`),
//         liveDemoLink: t(`${courseIndex}.works.${j}.link`),
//       };
//       projects.push(project);
//     }
//     return projects;
//   };

//   const getCourses = (): CourseProps[] => {
//     const items: CourseProps[] = [];

//     for (let i = 1; i <= numberOfCourses; i++) {
//       const course: CourseProps = {
//         code: t(`${i}.code`),
//         name: t(`${i}.name`),
//         semster: t(`${i}.semester`),
//         description: t(`${i}.description`),
//         projects: getProjects(i),
//       };
//       items.push(course);
//     }

//     return items;
//   };

//   const courses = getCourses();

//   return (
//     <section className="flex flex-col items-center justify-center p-4 sm:p-8" id="courses">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("title")}</h2>
//       <p className="mb-6 text-center max-w-2xl px-2">{t("description")}</p>

//       <div
//         className="
//           w-full sm:w-3/4 lg:w-1/2
//           min-h-[2rem] 
//           max-h-[50vh] 
//           overflow-y-auto 
//           p-4 
//           rounded-lg 
//           shadow-lg 
//           scrollbar-thin 
//           scrollbar-track-transparent 
//           scrollbar-thumb-transparent 
//           hover:scrollbar-thumb-gray-400
//           surface-offset 
//           border-color
//         "
//       >
//         {courses.map((course, index) => (
//           <ProyectCard
//             key={course.code || `course-${index}`}
//             code={course.code}
//             name={course.name}
//             semster={course.semster}
//             description={course.description}
//             projects={course.projects || []}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CardsContainer;