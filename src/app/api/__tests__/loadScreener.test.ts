import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../loadScreener/[id]/route";

describe("loadScreener API", () => {
  it("should return a screener when given a valid ID", async () => {
    await testApiHandler({
      params: { id: "abcd-123" },
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: "GET",
        });
        const data = await res.json();

        expect(res.status).toBe(200);
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
      },
    });
  });

  it("should return 404 when screener is not found", async () => {
    await testApiHandler({
      params: { id: "nonexistent" },
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: "GET",
        });
        const data = await res.json();

        expect(res.status).toBe(404);
        expect(data).toEqual({ error: "Screener not found" });
      },
    });
  });

  it("should return 400 when ID is missing", async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: "GET",
        });

        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data).toEqual({ error: "Missing id parameter" });
      },
    });
  });
});
