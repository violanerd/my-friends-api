const {Thought, User} = require('../models');

const thoughtController = {
    // GET /api/thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId})
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: "No thought found"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    createThought({ body },res){
        Thought.create(body)
            .then(({_id}) => {
               return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: { thoughts: _id}},
                    {new: true}
                )
            })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: "No user found"})
                    return
                }
                res.json(dbUserData)
            })
        .catch(err => res.status(400).json(err))
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: "No thoughts found"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    deleteThought({params}, res){
        Thought.findOneAndRemove({ _id: params.thoughtId})
        .then((dbThoughtData) => 
            !dbThoughtData
                ? res.status(404).json({ message: "No thoughts found"})
                : User.findOneAndUpdate(
                    {thoughts: params.thoughtId},
                    {$pull: {thoughts: params.thoughtId }},
                    {new: true}
                    ))
        .then(user => {
            if (!user){
                res.status(404).json({ message: "Thought deleted but no user found"})
                return
            }
            res.json({message: "Thought deleted and removed from user"})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    createReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $push:{reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: "No thoughts found"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    deleteReaction({params }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: "No thoughts found"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = thoughtController;