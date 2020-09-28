const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(404);
        });
    },
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.userId})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then (dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(404)
            });
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => res.json(err))
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.userId }, body, { new: true, runValidators:true})      
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID found.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.friendId } }, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID found.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this ID found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => json(err));
},
    };

    module.exports = userController;