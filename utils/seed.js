const {User, Thought} = require("../models");
const connection = require('../config/connection');
const { Types } = require('mongoose');

// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the entries in the collection
    await User.deleteMany({});
    await Thought.deleteMany({});
})
// testing purposes only
// creating 1 user and 5 thoughts??? 
const handleError = (err) => console.error(err);

User.create({
    _id: new Types.ObjectId,
    username: "Bob",
    email: 'Bob@me.com'
},
(err) => (err ? handleError(err) : console.log('Created new document')));

Thought.create({
    thoughtText: "This is a test",
    username: "bob",
    reactions: [
        {
            reactionBody: 'uggggghh',
            username: 'bob'
        }
    ]
},
(err) => (err ? handleError(err) : console.log('Created new document')));
process.exit(0);