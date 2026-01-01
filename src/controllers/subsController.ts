import type { Context } from "hono";
import { User } from "../models/userModel";
import { SubsPlan } from "../models/subsPlanModel";
import { Inventory } from "../models/inventoryModel";
import { Subs } from "../models/subsModel";
import { Audits } from "../models/auditsModel";
import { Types } from "mongoose";

const defualtCenterId = new Types.ObjectId("000000000000000000000252")

export const createSubs = async (c: Context) => {
  const { userId, planId, productId } = await c.req.json();

  const userExist = await User.findOne({ _id: userId } as any)
  if (!userExist) {
    return c.json({ msg: "User not found" }, 404)
  }
  const plan = await SubsPlan.findOne({ _id: planId } as any)
  if (!plan) {
    return c.json({ msg: "Plan not found" }, 404)
  }
  const inventory = await Inventory.findOne({
    productId,
    centerId: defualtCenterId,
    quantity: { $gt: 0 }
  } as any)
  if (!inventory) {
    return c.json({ msg: "no product in the stock" })
  }

  let nextBillingDate = new Date()

  if (plan.billingCycle === "MONTHLY") {
    nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }

  if (plan.billingCycle === "YEARLY") {
    nextBillingDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  }

  const subscription = await Subs.create({
    user: userId,
    plan: planId,
    product: productId,
    startDate: new Date,
    nextBillingDate
  })

  await Audits.create({
    entityType: "Subscription",
    entityId: subscription._id,
    action: "CREATE"
  })

  return c.json(subscription, 201)
}