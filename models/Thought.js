// thoughtText : String, Required, must be between 1-280 characters

// createdAt : Date, Set default value to the current timestamp, use moment in getter method to format timestamp on query

// username (user that created the thought): String, Required

// reactions (replies) : array of nested documents created with the reactionSchema

// Schema Settings : create a virtual called 'reactionCount' that retrives the length of the thought's reactions array field on query