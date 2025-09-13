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
    // recargar lista
    const res = await fetch("/api/comments");
    setComments(await res.json());
  };

  return (
    <section className="w-full max-w-4xl mx-auto space-y-6" id="recomendation">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <h3 className="text-sm">
          {t("description")} 🚀
        </h3>
        <p className="text-sm">
          {t("formTitle")}
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <CardContent>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full rounded-lg border p-2 mb-4"
            placeholder={t("formPlaceholder")}
          />
          <Button onClick={handleSubmit}>{t("formButton")}</Button>
        </CardContent>
      </Card>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <p className="text-sm">{c.body}</p>
              <span className="text-xs text-gray-500">
                — {c.user?.login}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
