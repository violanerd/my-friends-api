const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: "Share your reactions...",
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now,
        //custom get 
    }
})
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Share your thoughts...",
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: String,
        default: Date.now,
        //custom get 
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
})

// reaction Count virtual
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;