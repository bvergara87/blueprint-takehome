import { useState, useEffect, useCallback } from "react";

interface Answer {
  value: number;
  question_id: string;
}

export const useScreener = (screenerId: string) => {
  const [screener, setScreener] = useState<any>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchScreener = async () => {
      try {
        const response = await fetch(`/api/loadScreener?id=${screenerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch screener");
        }
        const data = await response.json();
        setScreener(data);
      } catch (err) {
        setError("Error loading screener. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchScreener();
  }, [screenerId]);

  const handleAnswer = useCallback(
    (value: number) => {
      if (!screener) return;
      const currentSection = screener.sections[currentSectionIndex];
      const questions = currentSection.questions;

      setAnswers((prevAnswers) => [
        ...prevAnswers.filter(
          (a) => a.question_id !== questions[currentQuestionIndex].questionId
        ),
        { value, question_id: questions[currentQuestionIndex].questionId },
      ]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentSectionIndex < screener.sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        setIsComplete(true);
      }
    },
    [screener, currentSectionIndex, currentQuestionIndex]
  );

  const handleBack = useCallback(() => {
    if (!screener) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(
        screener.sections[currentSectionIndex - 1].questions.length - 1
      );
    }
  }, [screener, currentSectionIndex, currentQuestionIndex]);

  const handleForward = useCallback(() => {
    if (!screener) return;
    const currentSection = screener.sections[currentSectionIndex];
    const questions = currentSection.questions;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < screener.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  }, [screener, currentSectionIndex, currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    console.log(JSON.stringify({ answers }, null, 2));
    // Here you would typically send the data to your backend
  }, [answers]);

  return {
    screener,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    isLoading,
    error,
    isComplete,
    handleAnswer,
    handleBack,
    handleForward,
    handleSubmit,
  };
};
