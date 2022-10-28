const {AuthenticationError} = require('apollo-server-express');
const {User, Post} = require('../models');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
            // .select('-__v -password')
            .populate('posts');
        },
        // get a single user by username
        user: async (parent, {username}) => {
            return User.findOne({username})
            .select('-__v -password')
            .populate('posts')
            
        },
        posts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Post.find(params)
        },
        post: async (parent, {_id}) => {
            return Post.findOne({_id});
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            return user;
        },
        login: async () => {
            
        }
    }
}

module.exports = resolvers;