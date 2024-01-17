import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { getToken } from "../helpers/constants";

const httplink = createHttpLink({
  uri: "https://instaway.onrender.com",
  // uri: "http://localhost:4000", 
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
 
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httplink),
});

export default client;
