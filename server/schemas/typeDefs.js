// use this file to define every piece of data that the client can expect to work with

// import the gql tagged template function
const {gql} = require('apollo-server-express');

// create the typeDefs, use scalars(data types);
const typeDefs = gql`
    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        replies: [Reply] # array of posts, bases on Post typedef
        replyCount: Int
    }
    type Reply {
        _id: ID
        replyBody: String
        createdAt: String
        username: String
    }
    type User {
        _id: ID
        username: String
        email: String
        posts: [Post] # array of posts, based on Post typedef
    }
    type Query {
        me: User
        user(username: String!): User # search by username, returns user 
        users: [User] # returns array of users
        post(_id: ID!): Post # data must exist to query
        posts(username: String): [Post] # can query by username, returning array of posts
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;