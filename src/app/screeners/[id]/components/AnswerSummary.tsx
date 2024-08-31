import React, { useEffect, useState } from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import {
  ScreenerAnswer,
  ScreenerQuestionResponse,
  ScreenerSection,
  ScreenerSectionQuestion,
} from "@/app/types/screener";

interface IAnswerSummary {
  answers: ScreenerAnswer[];
  navToQuestion: (sectionIndex: number, questionIndex: number) => void;
  handleBack: () => void;
  handleSubmit: () => void;
  screener: any;
  submitLoading: boolean;
}

const AnswerSummary = ({
  answers,
  handleBack,
  handleSubmit,
  screener,
  navToQuestion,
  submitLoading,
}: IAnswerSummary) => {
  const [sectionMap, setSectionMap] = useState(new Map());
  const getQuestionAndAnswerTitles = () => {
    const sectionMap = new Map();

    screener.sections.forEach((section: ScreenerSection, index: number) => {
      sectionMap.set(section.id, {
        index: index,
        sectionTitle: section.title,
        questions: [],
      });
      section.questions.forEach(
        (q: ScreenerSectionQuestion, qIndex: number) => {
          sectionMap.get(section.id).questions.push({
            questionTitle: q.title,
            givenAnswerTitle: section.answerOptions.find(
              (answerOption: { value: number; title: string }) =>
                answerOption.value ===
                answers.find((a) => a.question_id === q.questionId)?.value
            )?.title,
            questionId: q.questionId,
            questionIndex: qIndex,
          });
        }
      );
    });
    setSectionMap(sectionMap);
  };

  useEffect(() => {
    getQuestionAndAnswerTitles();
  }, [screener]);

  return (
    <Box>
      <HStack mb={4} justify="space-between" align="center">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button
          isLoading={submitLoading}
          colorScheme="green"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </HStack>
      <Heading size="md" mb={4}>
        Answer Summary
      </Heading>
      <VStack align="stretch" spacing={4}>
        {Array.from(sectionMap.values()).map((section: any) => (
          <Box key={section.id}>
            <Text fontSize="lg" mb={1} fontWeight="bold">
              {section.index + 1}. {section.sectionTitle}
            </Text>
            <VStack align="stretch" spacing={1}>
              {section.questions.map(
                (questionResponse: ScreenerQuestionResponse) => (
                  <Box
                    border="1px solid #E2E8F0"
                    p={4}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "#F5F5F5",
                    }}
                    onClick={() =>
                      navToQuestion(
                        section.index,
                        questionResponse.questionIndex
                      )
                    }
                    key={questionResponse.questionId}
                    my={2}
                  >
                    <Text fontWeight={"bold"}>
                      {questionResponse.questionTitle}
                    </Text>
                    <Text>{questionResponse.givenAnswerTitle}</Text>
                  </Box>
                )
              )}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AnswerSummary;
