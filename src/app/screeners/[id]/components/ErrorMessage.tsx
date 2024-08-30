import React from "react";
import { Container, Text } from "@chakra-ui/react";

type IErrorMessage = {
  error: string | null;
};

const ErrorMessage = ({ error }: IErrorMessage) => (
  <Container centerContent height="80vh">
    <Text>{error || "Screener not found"}</Text>
  </Container>
);

export default ErrorMessage;
