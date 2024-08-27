"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Fade,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
interface DiagnosticScreener {
  id: string;
  name: string;
  disorder: string;
}

export default function Home() {
  const router = useRouter();
  const [screeners, setScreeners] = useState<DiagnosticScreener[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchScreeners = async () => {
      try {
        const response = await fetch("/api/fetchScreeners");
        if (!response.ok) {
          throw new Error("Failed to fetch screeners");
        }
        const data = await response.json();
        setScreeners(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching screeners:", error);
      }
    };

    fetchScreeners();
  }, []);

  const handleScreenerSelect = (screenerId: string) => {
    // Handle screener selection, e.g., navigate to the screener page
    console.log(`Selected screener: ${screenerId}`);
    router.push(`/screeners/${screenerId}`);
  };

  return (
    <Container maxW="container.md" py={10}>
      <Fade in={isLoaded} transition={{ enter: { duration: 0.5 } }}>
        <VStack spacing={8} align="stretch" justify="center" height="80vh">
          <Heading size="xl" textAlign="center">
            Welcome to Blueprint Health
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Please select your diagnostic
          </Text>
          <VStack spacing={4} align="stretch">
            {screeners.map((screener) => (
              <Button
                key={screener.id}
                colorScheme="blue"
                size="lg"
                onClick={() => handleScreenerSelect(screener.id)}
              >
                {screener.name}
              </Button>
            ))}
          </VStack>
        </VStack>
      </Fade>
    </Container>
  );
}
