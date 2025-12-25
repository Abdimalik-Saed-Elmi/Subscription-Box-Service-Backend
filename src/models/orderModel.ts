import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscription:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    product:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    center:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Centers",
        required: true
    },
     quantity:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["PENDING", "SHIPPED", "DELIVERED", "FAILED"],
        default: "PENDING"
    }

}, {timestamps: true})

export const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema)