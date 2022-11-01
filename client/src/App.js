import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePost";
import SignIn from "./pages/SignIn";
import NotHere from "./pages/NotHere";
import Profile from "./pages/Profile";
import AddUser from "./pages/AddUser";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// import from react-router-dom, renaming browserrouter as router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// middleware to retrieve token and combine it with existing httplink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // wrap JSX code with Apolloprovider to allow everything to have access to server's API data through client
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-col justify-flex-start min-10-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/profile/:username" element={<Profile />}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotHere />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
