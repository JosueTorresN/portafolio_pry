export interface ProjectProps {
  title: string;
  tipe: string;
  description: string;
  image: string;
  date: string;
  technologies: string[];
  repositoryLink?: string;
  liveDemoLink?: string;
}

interface CourseProps {
    code: string;
    name: string;
    semster: string;
    description: string;
    projects?: ProjectProps[] | []; 
}

interface CoursesProps {
    courses: CourseProps[];
}

export type Project = {
  id: string;
  title: string;
  date: string;
  image: string;
  taggCont: number;
  tags: string[];
  techCont: number;
  tech: string[];
  excerpt: string;
  content: string;
  featured: boolean;
};

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