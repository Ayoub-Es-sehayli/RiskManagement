import { ApolloClient } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { HttpLink } from 'apollo-link-http';
import axios from "axios"
let $apollo: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:5000/graphql", fetch: axios as any }),
  cache: new InMemoryCache(),
})

export { $apollo }