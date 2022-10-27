const { Schema } = require('mongoose');

const replySchema = new Schema(
    {
        replyBody: {
            type: String,
            required: true,
            maxlength: 255
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = replySchema;