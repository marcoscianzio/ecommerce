import { Divider, Heading, Spinner, Stack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useMyFavoritesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = ({}) => {
  const { loading, data } = useMyFavoritesQuery();

  if (loading) {
    return (
      <Layout>
        <Spinner></Spinner>
      </Layout>
    );
  }

  console.log(data);

  return (
    <Layout>
      <Stack spacing={5}>
        <Heading wordBreak="break-all" fontSize="10xl">
          my favorites
        </Heading>
        <Divider></Divider>
      </Stack>
    </Layout>
  );
};

export default withApollo()(Favorites);
