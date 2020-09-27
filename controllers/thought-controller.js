const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .sort({ createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
        });
    },
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
            .then (dbThoughtData => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400)
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push : { thoughts: dbThoughtData._id } },
                    {new: true}
                );
            })
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => res.json(err))
    },
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $set: body }, { runValidators: true, new: true })
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400)
        });
    },
    deleteThought({ params }, res) {
        Thought.findOneAndRemove({_id: params.thoughtId })
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400)
        })
        return User.findOneAndUpdate(
            { thoughts: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        )
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400)
        });
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {$addToSet: { reactions: body } },
            {runValidators: true, new: true}
        )
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400)
        })
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {$pull: {reactions: { reactionId: params.reactionId} } },
        )
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400)
        })
    },          
};

module.exports = thoughtController;
