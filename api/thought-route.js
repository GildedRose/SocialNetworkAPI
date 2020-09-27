// GET to get all thoughts

// GET to get a single thought by it's _id

// POST to create new thought (don't forget to push created thought's _id to associated user's thoughts array field)
    // {
        //"thoughtText": "Here's a cool thought...",
        //"username": "lernantino",
        //"userId": "....."
    //}

// PUT to update a thought by _id

// DELETE to remove thought by _id

// /api/thoughts/:thoughtID/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value