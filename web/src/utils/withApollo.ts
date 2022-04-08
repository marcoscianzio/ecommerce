import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createApolloClient } from "next-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  cache: new InMemoryCache({
    typePolicies: {
      CartItem: {
        keyFields: ["itemId", "cartId"],
      },
    },
  }),
  credentials: "include",
});

export const withApollo = createApolloClient(client);
