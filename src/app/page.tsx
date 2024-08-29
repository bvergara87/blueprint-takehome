"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  VStack,
  Button,
  Fade,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Wave from "react-wavify";
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
        <VStack spacing={8} align="stretch" justify="center" height="90vh">
          <HStack justify="center" align="center">
            <Heading size="xl" textAlign="center">
              Welcome to{" "}
            </Heading>
            <Image src="/blueprint-logo.png" w={200} alt="blueprint-logo" />
          </HStack>
          <Text fontSize="xl" textAlign="center">
            Please select your diagnostic
          </Text>
          <VStack spacing={4} align="stretch">
            {screeners.map((screener) => (
              <Button
                key={screener.id}
                color="white"
                bg="#2D53E7"
                _hover={{
                  bg: "rgba(45, 83, 231, 0.8)",
                }}
                size="lg"
                onClick={() => handleScreenerSelect(screener.id)}
              >
                {screener.name}
              </Button>
            ))}
          </VStack>
        </VStack>
      </Fade>
      <Box position="absolute" bottom="0" left="0" right="0">
        <Wave
          fill="#2D53E7"
          paused={false}
          opacity={0.5}
          style={{ display: "flex" }}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.15,
            points: 3,
          }}
        />
      </Box>
    </Container>
  );
}
