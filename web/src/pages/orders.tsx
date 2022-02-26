import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Divider,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useMyOrdersQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = ({}) => {
  const { data, loading } = useMyOrdersQuery();

  if (loading) {
    return (
      <Layout>
        <Spinner></Spinner>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack spacing={5}>
        <Heading wordBreak="break-all" fontSize="10xl">
          my orders
        </Heading>
        <Divider></Divider>

        {data!.myOrders.length > 0 ? (
          JSON.stringify(data?.myOrders)
        ) : (
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              you don't have orders
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              buy a product in order to see your orders
            </AlertDescription>
          </Alert>
        )}
      </Stack>
    </Layout>
  );
};

export default withApollo()(Orders);
