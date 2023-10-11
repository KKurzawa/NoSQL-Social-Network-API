const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        username: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: value => value.toDateString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

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
            default: Date.now,
            get: value => value.toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true

        },
        id: false,
    },
);

thoughtSchema.virtual(`reactionCount`).get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
const Reaction = model('reaction', reactionSchema);

module.exports = { thoughtSchema, Thought, reactionSchema, Reaction };