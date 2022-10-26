const { Schema, model } = require('mongoose');

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
        },
        username: {
            type: String,
            required: true
        },
        replies: [replySchema]
    }
);

const Post = model('Post', postSchema);

module.exports = Post;