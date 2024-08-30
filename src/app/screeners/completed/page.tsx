"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const CompletedPage = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack height="80vh" justifyContent="center" alignItems="center">
        <Heading size="xl" textAlign="center">
          Diagnostic Completed
        </Heading>
        <Box bg="green.100" p={6} borderRadius="md">
          <Text fontSize="lg" textAlign="center">
            Thank you for completing the diagnostic. Your information has been
            successfully submitted and will be forwarded to your provider.
          </Text>
        </Box>
        <Text fontSize="md" textAlign="center">
          Your provider will review your responses and contact you if any
          follow-up is needed.
        </Text>
        <Button
          bg="#2D53E6"
          color="white"
          _hover={{
            bg: "rgba(45, 83, 231, 0.8)",
          }}
          onClick={handleReturnHome}
          size="lg"
          mt={4}
        >
          Return to Home
        </Button>
      </VStack>
    </Container>
  );
};

export default CompletedPage;
