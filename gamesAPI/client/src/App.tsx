import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/home';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache,
    uri: "http://localhost:4000/graphql"
  })

  return (

    <ApolloProvider client={client}>

      <div className="App">
      
        <Home />

      </div>

    </ApolloProvider>

  );
}

export default App;
