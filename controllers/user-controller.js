const {User, Thought} = require('../models');

const userController = {
    // GET /api/users
    getAllUsers(req,res){
        User.find({})
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    getUserById({ params }, res){
        User.findOne({ _id: params.id})
        .populate('thoughts')
        .populate('friends')
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: "No user found"})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    createUser({ body },res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: "No user found"})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    deleteUser({params}, res){
        User.findOneAndDelete({ _id: params.id})
        .then(user => {
            if (!user){
                res.status(404).json({ message: "No user found"})
                return
            }
            Thought.deleteMany({ _id: { $in: user.thoughts}})
        })   
        .then(() => res.json({message: "User and thoughts successfully deleted!"}))
        .catch(err => {
            res.status(400).json(err)
        })
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: "No user found"})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: "No user found"})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}
module.exports = userController;