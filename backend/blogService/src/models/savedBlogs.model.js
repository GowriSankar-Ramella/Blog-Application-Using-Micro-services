import mongoose from "mongoose";


const savedSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true})

export const Saved = mongoose.model("Saved",savedSchema)