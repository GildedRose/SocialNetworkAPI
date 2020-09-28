const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
// thoughtText : String, Required, must be between 1-280 characters
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
// createdAt : Date, Set default value to the current timestamp, use moment in getter method to format timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MM Do, YYYY [at] hh:mm a'),
        },
// username (user that created the thought): String, Required
        username: {
            type: String,
            required: true,
        },
// reactions (replies) : array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// Schema Settings : create a virtual called 'reactionCount' that retrives the length of the thought's reactions array field on query
    ThoughtSchema.virtual('reactionCount').get(function(){
        return this.reactions.length;
    });

const Thought =  model('Thought', ThoughtSchema);

module.exports = Thought;