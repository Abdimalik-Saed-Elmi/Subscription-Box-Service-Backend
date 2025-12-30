import { Hono } from "hono";
import { getOrders, getUserSubs } from "../controllers/userController";

const userRoute = new Hono()


userRoute.get("/me/subscriptions", getUserSubs)
userRoute.get("/me/orders", getOrders)

export default userRoute