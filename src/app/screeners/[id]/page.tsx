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
import LoadingSpinner from "./components/LoadingSpinner";
import ScreenerNavigation from "./components/ScreenerNavigation";
import ScreenerOptions from "./components/ScreenerOptions";
import ScreenerHeader from "./components/ScreenerHeader";
import AnswerSummary from "./components/AnswerSummary";

// Main component for the Screener page
const ScreenerPage = ({ params }: { params: { id: string } }) => {
  // Use custom hook to manage screener state and logic
  const {
    screener,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    isLoading,
    setIsComplete,
    submitLoading,
    error,
    isComplete,
    setCurrentSectionIndex,
    setCurrentQuestionIndex,
    handleAnswer,
    handleBack,
    handleForward,
    handleSubmit,
  } = useScreener(params.id);

  // Show loading spinner while fetching screener data
  if (isLoading) {
    return <LoadingSpinner />;
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
        {isComplete ? (
          <AnswerSummary
            navToQuestion={(sectionIndex: number, questionIndex: number) => {
              setCurrentSectionIndex(sectionIndex);
              setCurrentQuestionIndex(questionIndex);
              setIsComplete(false);
            }}
            handleBack={() => {
              setIsComplete(false);
            }}
            screener={screener}
            answers={answers}
            handleSubmit={handleSubmit}
          />
        ) : (
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <ScreenerHeader
              currentSectionTitle={currentSection.title}
              screenerSectionsLength={screener.sections.length}
              currentSectionIndex={currentSectionIndex}
              currentQuestionIndex={currentQuestionIndex}
              questionLength={questions.length}
              screenerName={screener.name}
            />
            <Box>
              <ScreenerOptions
                question={questions[currentQuestionIndex]}
                answerOptions={answerOptions}
                currentAnswer={answers.find(
                  (answer) =>
                    answer.question_id ===
                    questions[currentQuestionIndex].questionId
                )}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
              {/* Navigation buttons */}
              <ScreenerNavigation
                currentSectionIndex={currentSectionIndex}
                currentQuestionIndex={currentQuestionIndex}
                isComplete={isComplete}
                isLastQuestion={
                  currentSectionIndex === screener.sections.length - 1 &&
                  currentQuestionIndex === questions.length - 1
                }
                submitLoading={submitLoading}
                showNextButton={answers.some(
                  (answer) =>
                    answer.question_id ===
                    questions[currentQuestionIndex].questionId
                )}
                handleBack={handleBack}
                handleForward={handleForward}
                handleSubmit={handleSubmit}
              />
            </Box>
          </VStack>
        )}
      </Card>
    </Container>
  );
};

export default ScreenerPage;
