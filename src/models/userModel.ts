import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
)

export const User =  mongoose.model("User", userSchema)