// Used to mock API routes for testing
/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";

import { POST } from "../parsePatientScreenerResponse/route";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";

describe("/api/parsePatientScreenerResponse", () => {
  it("should parse the response and return results", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        answers: [
          { question_id: "question_a", value: 1 },
          { question_id: "question_b", value: 2 },
          { question_id: "question_c", value: 1 },
          { question_id: "question_d", value: 2 },
          { question_id: "question_e", value: 1 },
          { question_id: "question_f", value: 2 },
          { question_id: "question_g", value: 1 },
          { question_id: "question_h", value: 2 },
        ],
      },
    });

    const response = await POST(req as unknown as NextApiRequest);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([expect.any(String)]),
      })
    );
  });

  it("should return 400 when answers are missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {},
    });

    const response = await POST(req as unknown as NextApiRequest);

    expect(response.status).toBe(400);
  });

  it("should return 405 for non-POST requests", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    const response = await POST(req as unknown as NextApiRequest);

    expect(response.status).toBe(405);
  });
});
