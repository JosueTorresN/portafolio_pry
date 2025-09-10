import { useTranslations } from "next-intl";

export const translationsBlogs = () => {
    const t = useTranslations("Blog");
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

export default translationsBlogs;