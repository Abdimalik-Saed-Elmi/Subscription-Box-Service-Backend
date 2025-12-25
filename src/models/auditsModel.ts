import mongoose from "mongoose";

export const auditsSchema = new mongoose.Schema({
    entityType: {
        type: String,
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    metadata: {
        type: Object
    }

}, { timestamps: true })

export const Audits = mongoose.models.Audits || mongoose.model("Audits", auditsSchema)