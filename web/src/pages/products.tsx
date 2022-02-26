import {
  Button,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import ToggleFavoriteButton from "../components/ToggleFavoriteButton";
import { useItemsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
  const { loading, data, error } = useItemsQuery();

  return (
    <Layout>
      <Stack spacing={5}>
        <Stack wrap="wrap" direction="row" spacing={6} align="flex-end">
          <Heading wordBreak="break-all" fontSize="10xl">
            products
          </Heading>
          <Heading fontSize="7xl" variant="outline">
            let's buy
          </Heading>
        </Stack>

        <Divider></Divider>

        <Stack>
          <Formik
            initialValues={{
              search: "",
            }}
            onSubmit={() => {}}
          >
            {() => (
              <HStack as={Form}>
                <InputField name="search" />
                <Button w="20%" variant="primary">
                  search
                </Button>
              </HStack>
            )}
          </Formik>
        </Stack>
        <SimpleGrid columns={4} spacing={10}>
          {loading && !error ? (
            <Spinner></Spinner>
          ) : (
            data?.items.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <Stack
                  pb={4}
                  borderWidth={1}
                  cursor="pointer"
                  transition="all 0.2s"
                  borderColor="transparent"
                  spacing={4}
                  _hover={{
                    borderWidth: 1,
                    borderColor: "palette.400",
                  }}
                  onClick={() => {}}
                >
                  <Stack
                    position="relative"
                    bgSize="cover"
                    bgPos="center"
                    h="30em"
                    bgImage={`url(${item.images[0].url})`}
                  >
                    <ToggleFavoriteButton
                      itemId={item.id}
                      liked={item.liked}
                      top={8}
                      right={10}
                      position="absolute"
                      color="palette.bg"
                    />
                  </Stack>

                  <HStack px={2} justify="space-between">
                    <Text fontFamily="Basement Grotesque Black">
                      {item.name}
                    </Text>
                    <Text>${item.unitAmount}</Text>
                  </HStack>
                </Stack>
              </Link>
            ))
          )}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
};

export default withApollo()(Products);
