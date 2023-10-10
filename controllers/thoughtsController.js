const { Thought, Reaction } = require('../models/Thought');
const { User } = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts yet.' });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            const thought = await Thought.create(req.body);
            user = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought } },
                { runValidators: true, new: true }

            );
            res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id.' });
            };
            res.status(200).json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            console.log(thought)
            const reaction = await Reaction.create(req.body);
            console.log(reaction)
            thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: reaction } },
                { runValidators: true, new: true }

            );
            res.json(reaction);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params._id } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID.' });
            }
            const reaction = await Reaction.findOneAndRemove(req.params._id);
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID.' });
            }
            res.json({ message: 'Reaction deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};