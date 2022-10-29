const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const replySchema = require('./Reply')

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'Please leave a note!',
            minlength: 3,
            maxlength: 255
        },
        createdAt: {
            type: Date,
            default: Date.now,   
            get: timestamp => dateFormat(timestamp)         
        },
        username: {
            type: String,
            required: true
        },
        replies: [replySchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Post = model('Post', postSchema);

module.exports = Post;