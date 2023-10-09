const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [thoughtSchema],
        // thoughts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'thought',
        //     },

        // ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Thought = model('thought', thoughtSchema);
const User = model('user', userSchema);
module.exports = { User, Thought }; 