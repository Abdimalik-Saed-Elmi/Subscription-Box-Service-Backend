import mongoose from "mongoose";

export const subsPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,  
    },
        billingCycle:{
            type: String,
            enum: ["MONTHLY", "QUARTERLY", "YEARLY"]
        }


}, {timestamps: true})

export const SubsPlan = mongoose.models.SubsPlan || mongoose.model("SubsPlan", subsPlanSchema)