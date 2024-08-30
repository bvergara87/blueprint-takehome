import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ScreenerAnswer } from "@/app/types/screener";

export const useScreener = (screenerId: string) => {
  const router = useRouter();
  // State variables
  const [screener, setScreener] = useState<any>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ScreenerAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Fetch screener data on component mount
  useEffect(() => {
    fetchScreener();
  }, [screenerId]);

  const fetchScreener = useCallback(async () => {
    try {
      const response = await fetch(`/api/loadScreener/${screenerId}`);
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
  }, [screenerId]);
  // Handle user's answer to a question
  const handleAnswer = useCallback(
    (value: number) => {
      if (!screener) return;
      const currentSection = screener.sections[currentSectionIndex];
      const questions = currentSection.questions;

      // Update answers state
      setAnswers((prevAnswers) => [
        ...prevAnswers.filter(
          (a) => a.question_id !== questions[currentQuestionIndex].questionId
        ),
        {
          value,
          question_id: questions[currentQuestionIndex].questionId,
          section_id: currentSection.id,
        },
      ]);

      // Move to next question or section
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

  // Handle navigation to previous question
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

  // Handle navigation to next question
  const handleForward = useCallback(() => {
    if (!screener) return;
    const currentSection = screener.sections[currentSectionIndex];
    const questions = currentSection.questions;

    if (currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < screener.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  }, [screener, currentSectionIndex, currentQuestionIndex]);

  // Handle submission of screener answers
  const handleSubmit = useCallback(async () => {
    setSubmitLoading(true);
    const response = await fetch("/api/parsePatientScreenerResponse", {
      method: "POST",
      body: JSON.stringify({ answers }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setSubmitLoading(false);
    router.push("/screeners/completed");
  }, [answers, router]);

  // Return all necessary state and functions
  return {
    screener,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    isLoading,
    submitLoading,
    error,
    isComplete,
    setIsComplete,
    handleAnswer,
    handleBack,
    setCurrentSectionIndex,
    setCurrentQuestionIndex,
    handleForward,
    handleSubmit,
  };
};
