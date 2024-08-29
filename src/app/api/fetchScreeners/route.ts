import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  try {
    const screeners = await prisma.diagnosticScreener.findMany();
    return NextResponse.json(screeners);
  } catch (error) {
    console.error("Error fetching screeners:", error);
    return NextResponse.json(
      { error: "Failed to fetch screeners" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
