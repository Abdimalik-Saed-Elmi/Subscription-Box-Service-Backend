import mongoose from "mongoose";

const payAttemptSchema = new mongoose.Schema({
    subscription:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
     amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["SUCCESS", "FAILED"],
        required: true
    }

}, {timestamps: true})

export const PayAttempts = mongoose.models.PayAttempts || mongoose.model("PayAttempts", payAttemptSchema)