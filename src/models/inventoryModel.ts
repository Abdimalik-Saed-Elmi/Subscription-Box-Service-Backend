import mongoose from "mongoose";

const inventorySchena = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    centerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Centers",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 0
    }
},{timestamps: true})

export const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchena)