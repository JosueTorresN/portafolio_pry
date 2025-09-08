import type { NextApiRequest, NextApiResponse } from "next";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const OWNER = "tu-usuario";
const REPO = "recomendaciones-portfolio";
const ISSUE_NUMBER = 1; // el issue donde se guardarán los comentarios

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener comentarios
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}/comments`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { body } = req.body;
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({ body }),
      }
    );
    const data = await response.json();
    return res.status(201).json(data);
  }

  return res.status(405).end(); // Method not allowed
}
