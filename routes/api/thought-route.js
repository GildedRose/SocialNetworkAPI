const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require ('../../controllers/thought-controller')

// GET to get all thoughts
// GET to get a single thought by it's _id
// POST to create new thought (don't forget to push created thought's _id to associated user's thoughts array field)
// PUT to update a thought by _id
// DELETE to remove thought by _id
// /api/thoughts/:thoughtID/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value

router
.route('/')
.get(getThoughts)
.post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;