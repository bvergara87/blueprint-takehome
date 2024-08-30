/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET } from "../fetchScreeners/route";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  diagnosticScreener: {
    findMany: jest.fn(),
  },
  $disconnect: jest.fn(),
}));

describe("fetchScreeners API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all screeners", async () => {
    const mockScreeners = [
      { id: "1", name: "Screener 1" },
      { id: "2", name: "Screener 2" },
    ];

    (prisma.diagnosticScreener.findMany as jest.Mock).mockResolvedValue(
      mockScreeners
    );

    const { req } = createMocks({
      method: "GET",
    });

    const response = await GET(req as unknown as NextRequest);

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data).toEqual(mockScreeners);
    expect(prisma.diagnosticScreener.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when there's an error fetching screeners", async () => {
    (prisma.diagnosticScreener.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const { req } = createMocks({
      method: "GET",
    });

    const response = await GET(req as unknown as NextRequest);

    expect(response.status).toBe(500);
    const data = await response.json();

    expect(data).toEqual({ error: "Failed to fetch screeners" });
    expect(prisma.diagnosticScreener.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
  });
});
