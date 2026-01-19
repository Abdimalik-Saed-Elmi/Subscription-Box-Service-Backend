import type { Context } from "hono";
import { User } from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { configs } from "../configs/envConfig";



export const register = async (c: Context) => {
    const { name, email, password } = await c.req.json()

    const exist = await User.findOne({ email })
    if (exist) { return c.json({ error: "User already Exist" }, 400)}

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashed,
        role: "USER"
    })

    const token = jwt.sign({ userId: user._id, role: user.role }, configs.JWT_Secret, { expiresIn: "7d" })

    return c.json({
        msg: "User Registered Successfully",
        token,
        user:{
            id: user._id,
            name : user.name,
            email: user.email,
            role: user.role
        }
    }, 201)
}

export const login = async (c: Context) => {
    const { email, password } = await c.req.json()
    const user = await User.findOne({ email })
    if (!user) {return c.json({ error: "Invalid" }, 401)}
    
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        return c.json({ error: "Invalid Email or Password" }, 401)
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, configs.JWT_Secret, { expiresIn: "7d" })
    
    return c.json(token)

}