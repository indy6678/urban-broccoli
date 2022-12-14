const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match a valid email address!']
        },

        password: {
            type: String,
            required: true,
            minlength: 7
        },

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],

        neighbors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: { virtuals: true }
    }
);

// pre-save middleware to create a password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema)

module.exports = User;