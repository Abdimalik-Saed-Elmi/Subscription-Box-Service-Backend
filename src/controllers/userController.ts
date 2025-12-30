import type { Context } from "hono";
import { User } from "../models/userModel";
import { Subs } from "../models/subsModel";
import { Orders } from "../models/orderModel";


export const getUserSubs = async (c:Context) => {
    const user = c.get("user")
    const userId = user.userId
    const subscription = await Subs.findOne({userId, status: "ACTIVE"} as any)
    if (!subscription) {
        return c.json({msg: "subscription are not Active"})
    }

    return c.json(subscription)
}

export const getOrders = async (c:Context) => {
    const user = c.get("user")
    const userId = user.userId
    const orders = await Orders.find({userId} as any).sort({createdAt: -1})
    if (!orders) {
        return c.json({msg: "orders are not Active"})
    }

    return c.json(orders)
}