import React from "react";
import { Box, Text, Heading, VStack, Button } from "@chakra-ui/react";
import { Answer } from "@prisma/client";

type IScreenerOptions = {
  question: any;
  answerOptions: any[];
  currentAnswer: any;
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
};

const ScreenerOptions = ({
  question,
  answerOptions,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: IScreenerOptions) => {
  return (
    <Box>
      <Text mb={4}>
        Question {questionNumber} of {totalQuestions}
      </Text>
      <Heading size="md" mb={6}>
        {question.title}
      </Heading>
      <VStack spacing={4} align="stretch">
        {answerOptions.map((option: any) => {
          const isSelected = currentAnswer?.value === option.value;
          return (
            <Button
              key={option.value}
              color="white"
              onClick={() => onAnswer(option.value)}
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
    </Box>
  );
};

export default ScreenerOptions;
