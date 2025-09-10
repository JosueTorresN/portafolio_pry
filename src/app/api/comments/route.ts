import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const OWNER = "JosueTorresN";
const REPO = "portafolio_pry";
const ISSUE_NUMBER = 1;

// GET comments
export async function GET() {
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
  return NextResponse.json(data);
}

// POST comment
export async function POST(req: Request) {
  const { body } = await req.json();
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
  return NextResponse.json(data, { status: 201 });
}
