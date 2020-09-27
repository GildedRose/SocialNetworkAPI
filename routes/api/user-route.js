const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/user-controller');
const { route } = require('./thought-route');


// GET all users
// GET a single user by _id & populated thought & friend data
// POST new user
// PUT to update a user by _id
// DELETE to remove user by _id
//BONUS?? Remove user associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// POST to add a new friend to user's friend list
// DELETE to remove a friend from user's friend list

router
.route('/')
.get(getUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
