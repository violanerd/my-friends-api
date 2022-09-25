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
    }
}

module.exports = thoughtController;