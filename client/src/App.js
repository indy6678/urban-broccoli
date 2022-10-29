import logo from './logo.svg';
import './App.css';

// ApolloProvider provides data to all other componenets
// Client is constructor to help initialize conn to API server
// InMemoryCache enables Apollo Client instance to cache API response data for better efficiency
// createHttpLink allows control over how the Apollo Client makes a request (like middleware)
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { application } from 'express';

// establish new link to GQL server at /graphql endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// instantiate apollo client link and  create connection to API endpoint/
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
