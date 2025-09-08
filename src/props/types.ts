export interface ProjectProps {
  title: string;
  tipe: string;
  description: string;
  image: string; // URL de la imagen
  date: string;
  technologies: string[];
  repositoryLink?: string; // Hacer que repositoryLink sea opcional
  liveDemoLink?: string; // Hacer que liveDemoLink sea opcional
}

interface CourseProps {
    code: string;
    name: string;
    semster: string;
    description: string;
    projects?: ProjectProps[] | []; // Hacer que projects sea opcional
}

interface CoursesProps {
    courses: CourseProps[];
}

export type { CourseProps, CoursesProps };