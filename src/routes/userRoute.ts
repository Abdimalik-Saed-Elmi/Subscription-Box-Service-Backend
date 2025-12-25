import { Hono } from "hono";
import { createUser, getAllUser } from "../controllers/userController";

const userRoute = new Hono()

userRoute.post("/", createUser)
userRoute.get("/", getAllUser)


export default userRoute