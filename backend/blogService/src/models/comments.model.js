import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    username: {
        type: String,
        required: true        
    },

    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true})

export const Comment = mongoose.model("Comment",commentSchema)