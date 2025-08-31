interface CourseProps {
    code: string;
    name: string;
    semster: string;
    description: string;
}

interface CoursesProps {
    courses: CourseProps[];
}

export type { CourseProps, CoursesProps };