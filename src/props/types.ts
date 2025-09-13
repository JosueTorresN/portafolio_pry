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

export interface Project {
  id: string;
  title: string;
  date: string; // podrías usar Date si lo parseas
  image: string;
  tags: {
    cont: string;
    [key: string]: string;
  };
  tech: {
    cont: string;
    [key: string]: string;
  };
  excerpt: string;
  content: string;
  featured: boolean; // si lo usas como boolean, mejor cambiarlo a boolean
}

export interface GitHubComment {
  id: number;
  body: string;
  user: {
    login: string;
  };
}

export interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export interface Post {
  id: string;
  title: string;
  date: string;
  taggCont: number;
  tags: string[];
  techCont: number;
  tech: string[];
  excerpt: string;
  content: string;
  featured: boolean;
}

export type { CourseProps, CoursesProps };