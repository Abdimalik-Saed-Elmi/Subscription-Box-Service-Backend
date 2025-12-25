import type { Context } from "hono";
import { User } from "../models/userModel";


export const createUser = async (c: Context)=>{
    const {name, email} = await c.req.json();
    const user = await User.create({
        name,
        email
    })
return c.json(user, 201)
}

export const getAllUser =  async (c: Context )=>{
    const user = await User.find()
   return  c.json(user)
}
