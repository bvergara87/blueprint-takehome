import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params || !params.id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const screener = await prisma.diagnosticScreener.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          include: {
            questions: true,
            answerOptions: true,
          },
        },
      },
    });
    if (!screener) {
      return NextResponse.json(
        { error: "Screener not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(screener);
  } catch (error) {
    console.error("Error loading screener:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
