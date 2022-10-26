const {User, Post} = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
            .select('-__v -password')
        }
    }
}

module.exports = resolvers;