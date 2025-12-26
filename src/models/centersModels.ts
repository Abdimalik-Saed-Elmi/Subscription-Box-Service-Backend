import mongoose from "mongoose";

const centersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
},{timestamps: true})

export const Centers = mongoose.models.Centers || mongoose.model("Centers", centersSchema)