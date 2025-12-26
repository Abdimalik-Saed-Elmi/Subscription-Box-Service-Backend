import mongoose from "mongoose";

const subsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubsPlan",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "PAUSED", "CANCELED", "PAST_DUE", "REVIEW"],
        default: "ACTIVE"
    },
    startDate: {
        type: Date,
        required: true
    },
    nextBillingDate: {
        type: Date,
        required: true
    }

}, { timestamps: true })

export const Subs = mongoose.models.Subs || mongoose.model("Subs", subsSchema)