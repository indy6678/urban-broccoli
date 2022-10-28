const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                // .select('-__v -password')
                .populate('posts');
        },
        // get a single user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('posts')

        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params)
        },
        post: async (parent, { _id }) => {
            return Post.findOne({ _id });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect username and/or password. Try again');
            }
            // test to verify password is correct using Bcrypt
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect username and/or password. Try again');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;