// Used to mock API routes for testing
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../parsePatientScreenerResponse/route";
describe("parsePatientScreenerResponse API", () => {
  it("should parse the response and return results", async () => {
    await testApiHandler({
      appHandler,
      // responsePatcher is optional
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({
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
          }),
        });
        await expect(res.json()).resolves.toEqual(
          expect.objectContaining({
            results: expect.arrayContaining([expect.any(String)]),
          })
        );
      },
    });
  });

  it("should return 400 when answers are missing", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({}),
        });
        expect(res.status).toBe(400);
      },
    });
  });

  it("should return 405 for non-POST requests", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: "GET",
        });
        expect(res.status).toBe(405);
      },
    });
  });
});
