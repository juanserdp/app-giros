import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://127.0.0.1:4000/graphql'
    }),
    cache: new InMemoryCache(),
    onError: ({networkError, graphQLErrors}) => {
        console.log('graphQLError: ', graphQLErrors);
        console.log('networkError: ', networkError);
    }
});

export default client;