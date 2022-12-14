const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('neighbors')
                    .populate('replies');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
                // .select('-__v -password')
                .populate('posts')
                .populate('neighbors');
        },
        // get a single user by username
        user: async (parent, { username }) => {
            // console.log(username)
            const result =  User.findOne({ username })
                .select('-__v -password')
                .populate('posts')
                .populate('neighbors');
            // console.log(result)
            return result
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1});
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
        },
        addPost: async (parent, args, context) => {
            // check to see if the user is logged in
            if (context.user) {
                const post = await Post.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in to add a post!');
        },
        addReply: async (parent, { postId, replyBody}, context) => {
            // check that user is logged in
            if(context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    {_id: postId},
                    {$push: {replies: {replyBody, username: context.user.username}}},
                    {new: true, runValidators: true}
                );
                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in to add a reply!');
        },
        addNeighbor: async(parent, {neighborId}, context) => {
            // check to see if user is logged in
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {neighbors: neighborId}}, // using addToSet to prevent duplicates
                    {new: true}
                ).populate('neighbors');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to add a neighbor!')
        }
    }
}

module.exports = resolvers;