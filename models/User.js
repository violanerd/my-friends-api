const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true, // check the syntax here
        required: "Please enter a username",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Please enter an email address",
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [], // make sure brackets are correct here
    friends: [], // this is a self reference..... ???

},
{
    toJSON: {
        vitruals: true
    }
})
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);
module.exports = User;