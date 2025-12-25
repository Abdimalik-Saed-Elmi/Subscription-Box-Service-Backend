import mongoose from "mongoose";
import { configs } from "./envConfig";


export async function mongoConnect() {
    await mongoose.connect(configs.Mongo_Url);
    console.log("Mongo connected Clearlly")
}