"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Progress,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useScreener } from "./hooks/useScreener";

const ScreenerPage = ({ params }: { params: { id: string } }) => {
  const {
    screener,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    isLoading,
    submitLoading,
    error,
    isComplete,
    handleAnswer,
    handleBack,
    handleForward,
    handleSubmit,
  } = useScreener(params.id);

  if (isLoading) {
    return (
      <Container centerContent height="80vh">
        <VStack height="100%" justifyContent="center" alignItems="center">
          <Spinner size="xl" color="blue.500" />
          <Text>Loading Diagnostic...</Text>
        </VStack>
      </Container>
    );
  }

  if (error || !screener) {
    return (
      <Container centerContent height="80vh">
        <Text>{error || "Screener not found"}</Text>
      </Container>
    );
  }

  const currentSection = screener.sections[currentSectionIndex];
  const questions = currentSection.questions;
  const answerOptions = currentSection.answerOptions;

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">{screener.name}</Heading>
        <Text fontWeight="bold">{currentSection.title}</Text>
        <Progress
          value={
            ((currentSectionIndex * questions.length +
              currentQuestionIndex +
              1) /
              (screener.sections.length * questions.length)) *
            100
          }
        />
        <Box>
          <Text mb={4}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Heading size="md" mb={6}>
            {questions[currentQuestionIndex].title}
          </Heading>
          <VStack spacing={4} align="stretch">
            {answerOptions.map((option: any) => {
              const isSelected = answers.some(
                (answer) =>
                  answer.question_id ===
                    questions[currentQuestionIndex].questionId &&
                  answer.value === option.value
              );
              return (
                <Button
                  colorScheme="blue"
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  bg={isSelected ? "blue.200" : undefined}
                  _hover={{ bg: isSelected ? "blue.300" : undefined }}
                >
                  {option.title}
                </Button>
              );
            })}
          </VStack>
          <HStack justifyContent="space-between" mt={6}>
            <Button
              onClick={handleBack}
              isDisabled={
                currentSectionIndex === 0 && currentQuestionIndex === 0
              }
            >
              Back
            </Button>
            {isComplete &&
            currentSectionIndex === screener.sections.length - 1 &&
            currentQuestionIndex === questions.length - 1 ? (
              <Button
                isLoading={submitLoading}
                colorScheme="green"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleForward}
                sx={{
                  display:
                    (currentSectionIndex === screener.sections.length - 1 &&
                      currentQuestionIndex === questions.length - 1) ||
                    !answers.some(
                      (answer) =>
                        answer.question_id ===
                        questions[currentQuestionIndex].questionId
                    )
                      ? "none"
                      : "block",
                }}
              >
                Next
              </Button>
            )}
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default ScreenerPage;
