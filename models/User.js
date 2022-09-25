const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
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
    ],

},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

// friend count virtual
UserSchema.virtual('friendCount').get(function(){
    
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;