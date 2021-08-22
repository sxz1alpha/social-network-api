const { Thought, User } = require('../models');

const thoughtController = {

    //===================================create================================
    postThought({ body }, res) {
        Thought.create(body)
            .then(bodyData => {
                return User.findOneAndUpdate(
                    { _id: bodyData.userId }, 
                    { $push: { thoughts: _id } }, 
                    { new: true } 
                )                
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user with that id '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
    //====================================read=================================
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //===================================update================================
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, { new:true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //===================================delete================================
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id! '});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true } 
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user fround with this id. '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'no tought found with that id'})
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: body.reactionId } } }, { new: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'no tought found with that id'})
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));   
    }
};

module.exports = thoughtController;