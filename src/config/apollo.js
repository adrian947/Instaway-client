import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httplink = createHttpLink({
  uri: "https://instaway.onrender.com",
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: httplink,
});

export default client;
