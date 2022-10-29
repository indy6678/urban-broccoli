import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import from react-router-dom, renaming browserrouter as router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
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
        <Footer/>
      </div>
    </ApolloProvider>
  )
}

export default App;