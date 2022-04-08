import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        An error has ocurred! {error}
      </AlertTitle>
      <Link href="/">
        <Button
          mt={4}
          bg="red.400"
          color="white"
          _hover={{
            bg: "red.500",
          }}
        >
          Back to home
        </Button>
      </Link>
    </Alert>
  );
};

export default ErrorAlert;
