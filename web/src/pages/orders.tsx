import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../components/Layout";
import { useMyOrdersQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = ({}) => {
  useIsAuth();

  const { data, loading, error } = useMyOrdersQuery();

  if (error) {
    return <ErrorAlert error={error.message} />;
  }

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

        {Boolean(data?.myOrders.length) ? (
          <Stack pb={12}>
            {data?.myOrders.map((order) => {
              return (
                <Stack
                  spacing={6}
                  key={order.id}
                  px={4}
                  py={8}
                  borderWidth={1}
                  borderColor="palette.400"
                  rounded="lg"
                >
                  <HStack>
                    <HStack>
                      <Text>Order </Text>
                      <Text fontWeight="bold">#{order.id}</Text>
                    </HStack>
                    <HStack>
                      <Text color="palette.400" opacity={0.8}>
                        {new Date(order.createdAt).toISOString()}
                      </Text>
                    </HStack>
                  </HStack>
                  <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                      <AccordionButton pl={0} py={4}>
                        <AccordionIcon />
                        <Text ml={2}>Products ({order.cart.itemCount})</Text>
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Stack spacing={8}>
                          {order.cart.cartItems?.map((item) => {
                            return (
                              <Link
                                href={`product/${item.itemId}`}
                                key={item.itemId}
                              >
                                <HStack spacing={4} cursor="pointer">
                                  {Boolean(item.item.images.length) && (
                                    <Stack
                                      bgImg={`${item.item.images[0].url}`}
                                      boxSize={20}
                                      bgSize="cover"
                                    />
                                  )}
                                  <Text>{item.item.name}</Text>
                                  <Text color="palette.400" opacity={0.8}>
                                    ({item.quantity})
                                  </Text>
                                </HStack>
                              </Link>
                            );
                          })}
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Stack>
              );
            })}
          </Stack>
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
