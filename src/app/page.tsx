"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Progress,
} from "@chakra-ui/react";

const screenerData = {
  id: "abcd-123",
  name: "BPDS",
  disorder: "Cross-Cutting",
  content: {
    sections: [
      {
        type: "standard",
        title:
          "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
        answers: [
          { title: "Not at all", value: 0 },
          { title: "Rare, less than a day or two", value: 1 },
          { title: "Several days", value: 2 },
          { title: "More than half the days", value: 3 },
          { title: "Nearly every day", value: 4 },
        ],
        questions: [
          {
            question_id: "question_a",
            title: "Little interest or pleasure in doing things?",
          },
          {
            question_id: "question_b",
            title: "Feeling down, depressed, or hopeless?",
          },
          {
            question_id: "question_c",
            title: "Sleeping less than usual, but still have a lot of energy?",
          },
          {
            question_id: "question_d",
            title:
              "Starting lots more projects than usual or doing more risky things than usual?",
          },
          {
            question_id: "question_e",
            title: "Feeling nervous, anxious, frightened, worried, or on edge?",
          },
          {
            question_id: "question_f",
            title: "Feeling panic or being frightened?",
          },
          {
            question_id: "question_g",
            title: "Avoiding situations that make you feel anxious?",
          },
          {
            question_id: "question_h",
            title:
              "Drinking at least 4 drinks of any kind of alcohol in a single day?",
          },
        ],
      },
    ],
    display_name: "BDS",
  },
  full_name: "Blueprint Diagnostic Screener",
};

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<
    Array<{ value: number; question_id: string }>
  >([]);

  const questions = screenerData.content.sections[0].questions;
  const answerOptions = screenerData.content.sections[0].answers;

  const handleAnswer = (value: number) => {
    const newAnswer = {
      value,
      question_id: questions[currentQuestionIndex].question_id,
    };
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log(JSON.stringify({ answers: answers }, null, 2));
      // Here you would typically send the data to your backend
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">{screenerData.content.display_name}</Heading>
        <Text fontWeight="bold">{screenerData.content.sections[0].title}</Text>
        <Progress value={(currentQuestionIndex / questions.length) * 100} />
        <Box>
          <Text mb={4}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Heading size="md" mb={6}>
            {questions[currentQuestionIndex].title}
          </Heading>
          <VStack spacing={4} align="stretch">
            {answerOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
              >
                {option.title}
              </Button>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
