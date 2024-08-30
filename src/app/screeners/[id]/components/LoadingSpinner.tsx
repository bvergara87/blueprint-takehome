import React from "react";
import { Container, VStack, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Container centerContent height="80vh">
    <VStack height="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" color="#2D53E7" />
      <Text>Loading Diagnostic...</Text>
    </VStack>
  </Container>
);

export default LoadingSpinner;
