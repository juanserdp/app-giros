import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://fbslg4-4000.preview.csb.app/graphql`,
  }),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLError: ", graphQLErrors);
    console.log("networkError: ", networkError);
  },
});

export default client;
