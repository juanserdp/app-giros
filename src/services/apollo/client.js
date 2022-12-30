import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const urlLocalHost = "http://localhost:4000/graphql";
export const urlServerHost = "https://fbslg4-4000.preview.csb.app/graphql";
export const urlHerokuHost = "https://api-giros.herokuapp.com/graphql";
export const urlRenderHost = "https://api-giros.onrender.com/graphql";
const client = new ApolloClient({
  link: new HttpLink({
    uri: urlRenderHost,
  }),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLError: ", graphQLErrors);
    console.log("networkError: ", networkError);
  },
});

export default client;
