import React from "react";
import { Heading, Text, Progress } from "@chakra-ui/react";

interface IScreenerHeader {
  screenerSectionsLength: number;
  screenerName: string;
  currentSectionTitle: string;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  questionLength: number;
}

const ScreenerHeader = ({
  screenerSectionsLength,
  currentSectionIndex,
  currentSectionTitle,
  currentQuestionIndex,
  questionLength,
  screenerName,
}: IScreenerHeader) => {
  return (
    <>
      <Heading size="lg">{screenerName}</Heading>
      <Text fontWeight="bold">{currentSectionTitle}</Text>

      <Progress
        colorScheme="blue"
        borderRadius="full"
        value={
          ((currentSectionIndex * questionLength + currentQuestionIndex + 1) /
            (screenerSectionsLength * questionLength)) *
          100
        }
      />
    </>
  );
};

export default ScreenerHeader;
