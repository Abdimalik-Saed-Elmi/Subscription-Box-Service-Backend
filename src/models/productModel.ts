import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    } 
},{
    timestamps: true
})
export const Products = mongoose.models.Products || mongoose.model("Products", productSchema)