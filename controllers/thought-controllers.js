const { Thought, User } = require('../models');

const thoughtController = {

    //===================================create================================
    postThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //====================================read=================================
    getAllThoughts() {

    },

    getThoughtById() {

    },
    //===================================update================================
    updateThought() {

    },
    //===================================delete================================
    deleteThought() {

    }
}

module.exports = thoughtController;