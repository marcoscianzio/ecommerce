import {
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../components/Layout";
import { useItemsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
  const { loading, data, error } = useItemsQuery();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(data?.items);

  if (error) {
    return <ErrorAlert error={error.message} />;
  }

  useEffect(() => {
    if (!loading && data?.items) {
      setProducts(data.items);
    }
  }, [loading, data]);

  useEffect(() => {
    if (search && products && Boolean(products.length)) {
      const fuse = new Fuse(products, {
        keys: ["name", "description"],
      });

      const result = fuse.search(search);

      const newProducts = result.map((item) => item.item);

      setProducts(() => newProducts);
    } else {
      setProducts(data?.items);
    }
  }),
    [search];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(() => e.target.value);
  };

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
          <HStack>
            <FormControl variant="floating">
              <Input onChange={handleSearch} placeholder=" " />
              <FormLabel htmlFor="search">search</FormLabel>
            </FormControl>
          </HStack>
        </Stack>
        <SimpleGrid columns={4} spacing={10}>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            products?.map((item) => (
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
                >
                  <Stack
                    bgSize="cover"
                    bgPos="center"
                    h="30em"
                    bgImage={`url(${item.images[0].url})`}
                  ></Stack>

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
