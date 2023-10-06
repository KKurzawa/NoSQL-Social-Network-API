const { Thought, Reaction } = require('../models/Thought');
const { User } = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
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
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            console.log(user)
            const thought = await Thought.create({ thoughtText: req.body.thoughtText, username: user.userName });

            user = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }

            );
            res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    // async createThought(req, res) {
    //     try {
    //         const thought = await Thought.create(req.body);
    //         res.json(thought);
    //     } catch (err) {
    //         return res.status(500).json(err);
    //     }
    // },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thought);
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
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
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }

            );
            res.json(reaction);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { $in: [req.body._id] } } },
                { runValidators: true, new: true }

            );
            res.status(200).json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};