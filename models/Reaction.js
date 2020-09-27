const { Schema, Types } = require('mongoose');
const moment = require('moment');
const { timestamp } = require('console');

// SCHEMA ONLY
const reactionSchema = new Schema(
    {
// reactionId : Use Mongoose's ObjectId data type, default value is set to a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
// reactionBody : String, required, 280 character max
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
// username : string, required
        username: {
            type: String,
            required: true,
        },
// createdAt : Date, set default value to current timestamp, use moment in getter method to format on query
        createAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Schema settings: this will be used as reaction field's subdocument schema in Thought model

module.exports = reactionSchema