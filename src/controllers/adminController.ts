import type { Context } from "hono";
import { User } from "../models/userModel";
import { Orders } from "../models/orderModel";
import { Subs } from "../models/subsModel";
import { Inventory } from "../models/inventoryModel";
import { Audits } from "../models/auditsModel";

export const getUsers = async (c:Context) => {
    const users = await User.find().select("-password")
    return  c.json(users)
}

export const getOrders = async (c:Context) => {
    const orders = await Orders.find().sort({createdAt: -1})
    return c.json(orders)
}

export const getSubscriptions = async (c:Context) => {
    const subscriptions = await Subs.find().sort({createdAt: -1})
    return c.json(subscriptions)
}

export const getInventory = async (c:Context) => {
    const inventory = await Inventory.find()
    return c.json(inventory)
}

export const getAudits = async (c:Context) => {
    const audits = await Audits.find().sort({createdAt: -1})
    return c.json(audits)
}