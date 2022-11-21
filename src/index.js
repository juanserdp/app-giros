import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/fonts.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Sesion } from "./util/Sesion";
// import client from "./services/apollo/client";
import { urlHerokuHost, urlLocalHost } from "./services/apollo/client";

export const sesion = new Sesion();

const httpLink = createHttpLink({
  uri: urlLocalHost,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLError: ", graphQLErrors);
    console.log("networkError: ", networkError);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
