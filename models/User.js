const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
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
        match: /.+\@.+\..+/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ], 
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ], // this is a self reference..... ???

},
{
    toJSON: {
        vitruals: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
})
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;