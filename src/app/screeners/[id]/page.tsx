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
  Card,
  Image,
} from "@chakra-ui/react";
import { useScreener } from "./hooks/useScreener";

// Main component for the Screener page
const ScreenerPage = ({ params }: { params: { id: string } }) => {
  // Use custom hook to manage screener state and logic
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

  // Show loading spinner while fetching screener data
  if (isLoading) {
    return (
      <Container centerContent height="80vh">
        <VStack height="100%" justifyContent="center" alignItems="center">
          <Spinner size="xl" color="#2D53E7" />
          <Text>Loading Diagnostic...</Text>
        </VStack>
      </Container>
    );
  }

  // Display error message if screener data couldn't be loaded
  if (error || !screener) {
    return (
      <Container centerContent height="80vh">
        <Text>{error || "Screener not found"}</Text>
      </Container>
    );
  }

  // Extract current section and questions data
  const currentSection = screener.sections[currentSectionIndex];
  const questions = currentSection.questions;
  const answerOptions = currentSection.answerOptions;

  return (
    <Container maxW="container.md" py={10}>
      <Image src="/blueprint-logo.png" w={100} mb={6} alt="blueprint-logo" />
      <Card p={6} boxShadow="none" border="1px solid #E2E8F0">
        <VStack spacing={6} align="stretch">
          <Heading size="lg">{screener.name}</Heading>
          <Text fontWeight="bold">{currentSection.title}</Text>
          {/* Progress bar to show completion status */}
          <Progress
            colorScheme="blue"
            borderRadius="full"
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
            {/* Render answer options */}
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
                    key={option.value}
                    color="white"
                    onClick={() => handleAnswer(option.value)}
                    bg={isSelected ? "rgba(91, 123, 239, 0.8)" : "#2D53E7"}
                    _hover={{
                      bg: isSelected ? "#5B7BEF" : "rgba(45, 83, 231, 0.8)",
                    }}
                  >
                    {option.title}
                  </Button>
                );
              })}
            </VStack>
            {/* Navigation buttons */}
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
                // Show submit button on last question if all questions are answered
                <Button
                  isLoading={submitLoading}
                  colorScheme="green"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                // Show next button if not on last question and current question is answered
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
      </Card>
    </Container>
  );
};

export default ScreenerPage;
