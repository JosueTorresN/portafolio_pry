"use client";
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import {translationsBlogs} from "@/utils/traslationList";
import { Post } from "@/props/types";

export default function BlockPage() {
    const t = useTranslations("Blog");
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedTech, setSelectedTech] = useState("");
    const [sort, setSort] = useState("newest");
    const [activePost, setActivePost] = useState<Post | null>(null);
    const POSTS = translationsBlogs(t);

    const allTags: string[] = useMemo(() => {
        const s = new Set<string>();
        POSTS.forEach((p) => p.tags.forEach((t: string) => s.add(t)));
        return Array.from(s) as string[];
    }, []);

    const allTech: string[] = useMemo(() => {
        const s = new Set();
        POSTS.forEach((p) => p.tech.forEach((t) => s.add(t)));
        return Array.from(s) as string[];
    }, []);

    const filtered = useMemo(() => {
        let list = POSTS.slice();
        if (query.trim()) {
        const q = query.toLowerCase();
        list = list.filter(
            (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q)
        );
        }
        if (selectedTag) list = list.filter((p) => p.tags.includes(selectedTag));
        if (selectedTech) list = list.filter((p) => p.tech.includes(selectedTech));

        list.sort((a, b) => {
        if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
        return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return list;
    }, [query, selectedTag, selectedTech, sort]);

    return (
    <main className="min-h-screen bg-bg text-text p-6 md:p-12">
    <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-primary">{t("title")}</h2>
            <p className="text-sm text-text-offset">
            {t("description")}
            </p>
        </div>

        <div className="flex gap-3 items-center">
            <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t("search")}...`}
            className="px-3 py-2 rounded-md border border-border bg-bg-offset text-text shadow-sm w-64"
            />

            <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-md border border-border surface-offset text-text"
            >
            <option value="newest">{t("recent")}</option>
            <option value="oldest">{t("latest")}</option>
            </select>
        </div>
        </div>

        {/* Tags */}
        <section className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
            <span className="text-xs text-text-offset">Tags:</span>
            <div className="flex gap-2 flex-wrap">
            <button
                onClick={() => setSelectedTag("")}
                className={`px-2 py-1 rounded text-sm border border-border ${
                selectedTag === "" ? "primary text-text" : "primary-hover primary-offset text-text--offset"
                }`}
            >
            {t("all")}
            </button>
            {allTags.map((t, index) => (
                <button
                key={t || `tag-${index}`}
                onClick={() => setSelectedTag(t)}
                className={`px-2 py-1 rounded text-sm border border-border ${
                    selectedTag === t ? "secondary text-white" : "secondary-hover text-text"
                }`}
                >
                {t}
                </button>
            ))}
            </div>
        </div>

        {/* Tech filter */}
        <div className="flex items-center gap-2">
            <span className="text-xs text-text-offset">{t("technologies")}:</span>
            <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-2 py-1 rounded border border-border surface-offset text-sm text-text"
            >
            <option value="">{t("all")}</option>
            {allTech.map((t) => (
                <option key={t} value={t}>
                {t}
                </option>
            ))}
            </select>
        </div>

        {selectedTag || selectedTech ? (
            <button
            onClick={() => {
                setSelectedTag("");
                setSelectedTech("");
            }}
            className="ml-auto text-sm text-red-600 underline"
            >
            {t("cleanFilters")}
            </button>
        ) : null}
        </section>

        {/* Posts */}
        <section className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
            <article
            key={post.id}
            className="bg-bg-offset p-6 rounded-lg shadow-sm border border-border"
            >
            <div className="flex items-start justify-between">
                <div>
                <h2 className="text-xl font-semibold mb-1 text-text">{post.title}</h2>
                <p className="text-sm text-text-offset mb-2">
                    {format(new Date(post.date), "PPP")}
                </p>
                </div>
                {post.featured && (
                <span className="text-xs bg-secondary px-2 py-1 rounded text-white">
                    Featured
                </span>
                )}
            </div>

            <p className="text-text-offset mb-3">{post.excerpt}</p>

            <div className="flex items-center gap-3 flex-wrap">
                {post.tags.map((t) => (
                <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className="text-xs px-2 py-1 border border-border rounded bg-bg-offset text-text"
                >
                    #{t}
                </button>
                ))}

                <div className="ml-auto flex gap-2">
                <button
                    onClick={() => setActivePost(post)}
                    className="px-3 py-1 rounded primary primary-hover"
                >
                    {t("read")}
                </button>
                </div>
            </div>
            </article>
        ))}
        </section>

        {/* Empty */}
        {filtered.length === 0 && (
        <p className="mt-8 text-center text-text-offset">
            {t("noFound")}.
        </p>
        )}

        {/* Modal */}
        {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setActivePost(null)}
            />
            <div className="relative max-w-3xl w-full surface-offset p-6 rounded-lg shadow-lg z-10 overflow-auto max-h-[90vh] border border-border">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text">{activePost.title}</h2>
                    <p className="text-sm text-text-offset">
                        {format(new Date(activePost.date), "PPP")}
                    </p>
                </div>
                <button
                onClick={() => setActivePost(null)}
                className="text-text-offset"
                >
                {t("closed")}
                </button>
            </header>

            <article className="mt-4 text-text">
                <ReactMarkdown>{activePost.content}</ReactMarkdown>
            </article>

            <footer className="mt-6 flex gap-2 flex-wrap">
                {activePost.tags.map((t: string) => (
                <span
                    key={t}
                    className="text-xs border border-border px-2 py-1 rounded text-text"
                >
                    #{t}
                </span>
                ))}
            </footer>
            </div>
        </div>
        )}
    </div>
    </main>

    );
}