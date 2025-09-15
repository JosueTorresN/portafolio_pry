"use client";
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import {translationsProyects} from "@/utils/traslationList";
import { Project } from "@/props/types";

export default function ProjectsPage() {
  const t = useTranslations("Projects");
  // Estados para filtros y búsqueda
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeProject, setActiveProject] = useState<Project | undefined>();
  const PROJECTS = translationsProyects(t);

  // Tags únicos
  const allTags = useMemo(() => {
    const s = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t: string) => s.add(t)));
    return Array.from(s);
  }, []);

  // Tech únicas
  const allTech = useMemo(() => {
    const s = new Set<string>();
    PROJECTS.forEach((p) => p.tech.forEach((t: string) => s.add(t)));
    return Array.from(s);
  }, []);

  // Filtros
  const filtered = useMemo(() => {
    let list = PROJECTS.slice();
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

    list.sort((a, b) =>
      sort === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return list;
  }, [query, selectedTag, selectedTech, sort]);

  return (
    <main className="min-h-screen bg-bg text-text p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">{t("title")}</h2>
            <p className="text-sm text-text-offset">
              {t("description")}🚀
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proyectos..."
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

        {/* Tags + Tech */}
        <section className="mb-6 flex flex-wrap gap-3 items-center">
          {/* Tags */}
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
              {allTags.map((t) => (
                <button
                  key={t}
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

          {/* Tech */}
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

        {/* Proyectos */}
        <section className="grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="bg-bg-offset p-6 rounded-lg shadow-sm border border-border"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1 text-text">{p.title}</h2>
                  <p className="text-sm text-text-offset mb-2">
                    {format(new Date(p.date), "PPP")}
                  </p>
                </div>
                {p.featured && (
                  <span className="text-xs px-2 py-1 rounded toggle-button">
                    {t("outstanding")}
                  </span>
                )}
              </div>
              <p className="text-text-offset mb-3">{p.excerpt}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {p.tags.map((t) => (
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
                    onClick={() => setActiveProject(p)}
                    className="px-3 py-1 rounded primary primary-hover text-white"
                  >
                    {t("read")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="mt-8 text-center text-text-offset">
            {t("noFound")}
          </p>
        )}

        {/* Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setActiveProject(undefined)}
            />
            <div className="relative max-w-3xl w-full surface-offset p-6 rounded-lg shadow-lg z-10 overflow-auto max-h-[90vh] border border-border">
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-text">{activeProject.title}</h2>
                  <p className="text-sm text-text-offset">
                    {format(new Date(activeProject.date), "PPP")}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProject(undefined)}
                  className="text-text-offset"
                >
                  {t("closed")}
                </button>
              </header>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-60 object-cover rounded my-4"
              />
              <article className="mt-4 text-text">
                <ReactMarkdown>{activeProject.content}</ReactMarkdown>
              </article>
              <footer className="mt-6 flex gap-2 flex-wrap">
                {activeProject.tags.map((t: string) => (
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
