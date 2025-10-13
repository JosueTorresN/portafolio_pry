"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { GitHubComment } from "@/props/types";

export default function RecommendationsSection() {
  const t = useTranslations("Recomendation");
  const [comments, setComments] = useState<GitHubComment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: newComment }),
    });
    setNewComment("");
    const res = await fetch("/api/comments");
    setComments(await res.json());
  };

  return (
    <section
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      id="recomendation"
    >
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">{t("title")}</h2>
        <h3 className="text-sm sm:text-base">
          {t("description")} 🚀
        </h3>
        <p className="text-xs sm:text-sm">
          {t("formTitle")}
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full min-h-[100px] rounded-lg border p-2 mb-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("formPlaceholder")}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto"
            >
              {t("formButton")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base">{c.body}</p>
                <span className="text-xs text-gray-500 block mt-2">
                  — {c.user?.login || "Anon"}
                </span>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            {t("noComments")}
          </p>
        )}
      </div>
    </section>
  );
}