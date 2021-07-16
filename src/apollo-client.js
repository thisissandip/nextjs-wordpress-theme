import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost/mysite/graphql',
	cache: new InMemoryCache(),
});

export default client;
