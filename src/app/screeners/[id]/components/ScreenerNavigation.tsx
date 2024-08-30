import React from "react";
import { HStack, Button } from "@chakra-ui/react";

interface IScreenerNavigation {
  currentSectionIndex: number;
  currentQuestionIndex: number;
  isComplete: boolean;
  isLastQuestion: boolean;
  submitLoading: boolean;
  showNextButton: boolean;
  handleBack: () => void;
  handleForward: () => void;
  handleSubmit: () => void;
}

const ScreenerNavigation = ({
  currentSectionIndex,
  currentQuestionIndex,
  isComplete,
  isLastQuestion,
  submitLoading,
  showNextButton,
  handleBack,
  handleForward,
  handleSubmit,
}: IScreenerNavigation) => {
  return (
    <HStack justifyContent="space-between" mt={6}>
      <Button
        onClick={handleBack}
        isDisabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
      >
        Back
      </Button>
      {showNextButton && <Button onClick={handleForward}>Next</Button>}
    </HStack>
  );
};

export default ScreenerNavigation;
