import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    // wrap JSX code with Apolloprovider to allow everything to have access to server's API data through client
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-10-vh'>
        <Header />
        <div>
          <Home />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App;