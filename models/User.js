const { Schema, model } = require('mongoose');

const UsernameSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'This must be a valid email!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
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