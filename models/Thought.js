const { Schema, model, Types } = require('mongoose');
const userSchema = require('./User');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const reactionSchema = new Schema(
    {
        reactionId: Schema.Types.ObjectId,
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;