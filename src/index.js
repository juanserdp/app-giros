import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
// import client from "./services/apollo/client";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
);
