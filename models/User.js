const { Schema, model } = require('mongoose');

const UsernameSchema = new Schema(
// username: String, Unique, Required, Trimmed
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

    // email: String, Required, Unique, must match valid email address (Mongoose matching validation)
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'This must be a valid email!']
        },
    // thoughts: array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
    // friends: array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema Settings: virtual 'friendCount' retrieves length of user's friends array field on query
UsernameSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UsernameSchema);

module.exports = User;