import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorAlert from "../../components/ErrorAlert";
import { useCheckoutSuccessQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import { withApollo } from "../../utils/withApollo";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = ({}) => {
  useIsAuth();

  const router = useRouter();

  const { data, loading, error } = useCheckoutSuccessQuery({
    variables: {
      sessionId: router.query.id as string,
    },
    skip: typeof router.query.id == "undefined",
  });

  if (error) {
    return <ErrorAlert error={error.message} />;
  }

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Order #{data?.checkoutSuccess.id} created!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for using our service. Hope you're doing well.
      </AlertDescription>
      <Link href="/">
        <Button variant="primary" mt={5}>
          Back to home
        </Button>
      </Link>
    </Alert>
  );
};

export default withApollo()(Success);
