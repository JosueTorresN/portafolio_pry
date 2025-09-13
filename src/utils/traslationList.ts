import { useTranslations } from "next-intl";

export const translationsBlogs = (t: (key: string) => string) => {
    // const t = useTranslations("Blog");
    const cont = parseInt(t("cont"));
    const blogs = [];
    for (let i = 1; i <= cont; i++) {
        const blog = {
            id: t(`${i}.id`),
            title: t(`${i}.title`),
            date: t(`${i}.date`),
            taggCont: parseInt(t(`${i}.tags.cont`)),
            tags: Array.from({ length: parseInt(t(`${i}.tags.cont`)) }, (_, j) => t(`${i}.tags.${j + 1}`)),
            techCont: parseInt(t(`${i}.tech.cont`)),
            tech: Array.from({ length: parseInt(t(`${i}.tech.cont`)) }, (_, j) => t(`${i}.tech.${j + 1}`)),
            excerpt: t(`${i}.excerpt`),
            content: t(`${i}.content`),
            featured: t(`${i}.featured`) === "true"
        };
        blogs.push(blog);
    } 
    return blogs;
};

export const translationsProyects = (t: (key: string) => string) => {
    // const t = useTranslations("Projects");
    const cont = parseInt(t("cont"));
    const Proyects = [];
    for (let i = 1; i <= cont; i++) {
        const proyect = {
            id: t(`${i}.id`),
            title: t(`${i}.title`),
            date: t(`${i}.date`),
            image: t(`${i}.image`),
            taggCont: parseInt(t(`${i}.tags.cont`)),
            tags: Array.from({ length: parseInt(t(`${i}.tags.cont`)) }, (_, j) => t(`${i}.tags.${j + 1}`)),
            techCont: parseInt(t(`${i}.tech.cont`)),
            tech: Array.from({ length: parseInt(t(`${i}.tech.cont`)) }, (_, j) => t(`${i}.tech.${j + 1}`)),
            excerpt: t(`${i}.excerpt`),
            content: t(`${i}.content`),
            featured: t(`${i}.featured`) === "true",
        };
        Proyects.push(proyect);
    }
    return Proyects;
}

export const translationsHobbies = (t: (key: string) => string) => {
    // const t = useTranslations("Hobbies");
    const cont = parseInt(t("cont"));
    const hobbies = [];
    for (let i = 1; i <= cont; i++) {
        const hobby = {
            id: t(`${i}.id`),
            title: t(`${i}.title`),
            image: t(`${i}.image`),
            description: t(`${i}.description`),
        };
        hobbies.push(hobby);
    }
    return hobbies;
}

// export { translationsBlogs, translationsProyects };