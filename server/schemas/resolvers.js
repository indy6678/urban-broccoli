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
            
        },
        posts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Post.find(params)
        }
    }
}

module.exports = resolvers;