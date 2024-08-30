import { NextRequest, NextResponse } from "next/server";
import {
  ScreenerAnswer,
  ScreenerDomainMapping,
  ScreenerDomainScore,
} from "@/app/types/screener";
// TODO: we could have each of the questions in the db have an added field that references it's domain as opposed to loading this from memory.
const domainMapping = [
  {
    question_id: "question_a",
    domain: "depression",
  },
  {
    question_id: "question_b",
    domain: "depression",
  },
  {
    question_id: "question_c",
    domain: "mania",
  },
  {
    question_id: "question_d",
    domain: "mania",
  },
  {
    question_id: "question_e",
    domain: "anxiety",
  },
  {
    question_id: "question_f",
    domain: "anxiety",
  },
  {
    question_id: "question_g",
    domain: "anxiety",
  },
  {
    question_id: "question_h",
    domain: "substance_use",
  },
];

function calculateDomainScores(
  answers: ScreenerAnswer[],
  domainMapping: ScreenerDomainMapping[]
): ScreenerDomainScore {
  return answers.reduce((domainScores: ScreenerDomainScore, answer) => {
    const mapping = domainMapping.find(
      (m) => m.question_id === answer.question_id
    );
    if (mapping) {
      domainScores[mapping.domain] =
        (domainScores[mapping.domain] || 0) + answer.value;
    }
    return domainScores;
  }, {});
}

function determineAssessments(domainScores: ScreenerDomainScore): string[] {
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

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();

    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: "Invalid input format" },
        { status: 400 }
      );
    }
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
