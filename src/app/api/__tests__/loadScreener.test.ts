/**
 * @jest-environment node
 */
// Used to mock API routes for testing
import { createMocks } from "node-mocks-http";
import { GET } from "../loadScreener/[id]/route";
import { NextRequest } from "next/server";

describe("loadScreener API", () => {
  it("should return a BPDS Screener when given the valid ID", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: "abcd-123" },
    });

    const response = await GET(req as unknown as NextRequest, {
      params: { id: "abcd-123" },
    });

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data).toEqual(
      expect.objectContaining({
        id: "abcd-123",
        disorder: expect.any(String),
        fullName: expect.any(String),
        sections: expect.arrayContaining([
          expect.objectContaining({
            screenerId: expect.any(String),
            id: expect.any(String),
            type: expect.any(String),
            title: expect.any(String),
            answerOptions: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                sectionId: expect.any(String),
                value: expect.any(Number),
              }),
            ]),
            questions: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                sectionId: expect.any(String),
                questionId: expect.any(String),
                title: expect.any(String),
              }),
            ]),
          }),
        ]),
      })
    );
  });

  it("should return 404 when screener is not found", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: "nonexistent" },
    });

    const response = await GET(req as unknown as NextRequest, {
      params: { id: "nonexistent" },
    });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toEqual({ error: "Screener not found" });
  });

  it("should return 400 when ID is missing", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    const response = await GET(req as unknown as NextRequest, {
      params: { id: "" },
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ error: "Missing id parameter" });
  });
});
