const express = require('express');

// import Apollo server
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in schema data
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// new instance of Apollo server with GQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    // integrate apollo server with the exress app as middleware
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
            // include test for GQL
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
}