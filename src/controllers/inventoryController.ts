import type { Context } from "hono";
import { Inventory } from "../models/inventoryModel";
import { Types } from "mongoose";



export const addInventory = async (c:Context) =>{
    const {productId, centerId, quantity} = await c.req.json()

    if (!productId || !centerId || quantity < 0) {
        return c.json({error: "Invalid"}, 400)
    }

    const existing = await Inventory.findOne({
        productId : new Types.ObjectId(productId),
        centerId : new Types.ObjectId(centerId)
    } as any)

    if (existing) {
        return c.json({error: "Inventory already exist update"}, 400)
    }

    const inventory = await Inventory.create({
        productId : new Types.ObjectId(productId),
        centerId : new Types.ObjectId(centerId),
        quantity
    })

    return c.json(inventory, 201)
}


export const updateInventory = async (c:Context) =>{
    const {productId, centerId, quantity} = await c.req.json()

    if (!productId || !centerId || quantity < 0) {
        return c.json({error: "Invalid"}, 400)
    }

    const inventory = await Inventory.findByIdAndUpdate({
        productId : new Types.ObjectId(productId),
        centerId : new Types.ObjectId(centerId)
    } as any, {quantity}, {new: true} as any)

    if (!inventory) {
        return c.json({error: "Inventory  not found"}, 404)
    }

    return c.json(inventory)
}