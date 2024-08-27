import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Answer {
  value: number;
  question_id: string;
}

interface DomainMapping {
  question_id: string;
  domain: string;
}

interface DomainScore {
  [key: string]: number;
}

const DOMAIN_MAPPING_FILE = path.join(
  process.cwd(),
  "data",
  "domainMapping.json"
);

async function getDomainMapping(): Promise<DomainMapping[]> {
  const data = await fs.readFile(DOMAIN_MAPPING_FILE, "utf-8");
  return JSON.parse(data);
}

function calculateDomainScores(
  answers: Answer[],
  domainMapping: DomainMapping[]
): DomainScore {
  const domainScores: DomainScore = {};

  answers.forEach((answer) => {
    const mapping = domainMapping.find(
      (m) => m.question_id === answer.question_id
    );
    if (mapping) {
      domainScores[mapping.domain] =
        (domainScores[mapping.domain] || 0) + answer.value;
    }
  });

  return domainScores;
}

function determineAssessments(domainScores: DomainScore): string[] {
  const assessments: string[] = [];

  if (domainScores.depression >= 2 || domainScores.anxiety >= 2) {
    assessments.push("PHQ-9");
  }
  if (domainScores.mania >= 2) {
    assessments.push("ASRM");
  }
  if (domainScores.substance_use >= 1) {
    assessments.push("ASSIST");
  }

  return assessments;
}

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: "Invalid input format" },
        { status: 400 }
      );
    }

    const domainMapping = await getDomainMapping();
    const domainScores = calculateDomainScores(answers, domainMapping);
    const results = determineAssessments(domainScores);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
