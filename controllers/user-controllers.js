const { User } = require('../models');

const userController = {

    // ================================create=============================
    // creates a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //=================================read===============================
    // gets all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: "-__vS"
        })
        .select('__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // gets user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //=========================================update==============================
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user found with that id '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: { friendId: params.friendId } } },
            { new: true }
        )
        .then(err => res.json(err));
    },
    //=========================================delete=============================
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

}

module.exports = userController;