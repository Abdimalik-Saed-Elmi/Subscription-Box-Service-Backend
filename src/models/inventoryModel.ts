import mongoose from "mongoose";

export const inventorySchena = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    centers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Centers"
    },
    quantity:{
        type: Number,
        required: true
    }
},{timestamps: true})

export const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchena)