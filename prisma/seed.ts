import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const screener = await prisma.diagnosticScreener.upsert({
    where: { id: "abcd-123" },
    update: {},
    create: {
      id: "abcd-123",
      name: "BPDS",
      disorder: "Cross-Cutting",
      fullName: "Blueprint Diagnostic Screener",
      sections: {
        create: {
          type: "standard",
          title:
            "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
          answerOptions: {
            createMany: {
              data: [
                { title: "Not at all", value: 0 },
                { title: "Rare, less than a day or two", value: 1 },
                { title: "Several days", value: 2 },
                { title: "More than half the days", value: 3 },
                { title: "Nearly every day", value: 4 },
              ],
            },
          },
          questions: {
            createMany: {
              data: [
                {
                  questionId: "question_a",
                  title: "Little interest or pleasure in doing things?",
                },
                {
                  questionId: "question_b",
                  title: "Feeling down, depressed, or hopeless?",
                },
                {
                  questionId: "question_c",
                  title:
                    "Sleeping less than usual, but still have a lot of energy?",
                },
                {
                  questionId: "question_d",
                  title:
                    "Starting lots more projects than usual or doing more risky things than usual?",
                },
                {
                  questionId: "question_e",
                  title:
                    "Feeling nervous, anxious, frightened, worried, or on edge?",
                },
                {
                  questionId: "question_f",
                  title: "Feeling panic or being frightened?",
                },
                {
                  questionId: "question_g",
                  title: "Avoiding situations that make you feel anxious?",
                },
                {
                  questionId: "question_h",
                  title:
                    "Drinking at least 4 drinks of any kind of alcohol in a single day?",
                },
              ],
            },
          },
        },
      },
      ScreenerContent: {
        create: {
          displayName: "BDS",
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
