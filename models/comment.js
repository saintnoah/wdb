var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        //id is a reference to a user model ID
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

{
    username: ""
}

module.exports = mongoose.model("Comment", commentSchema);