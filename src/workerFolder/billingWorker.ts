import { Worker } from "bullmq";
import { Subs } from "../models/subsModel";
import { PayAttempts } from "../models/paymentAttemptModel";
import { Orders } from "../models/orderModel";
import { Types } from "mongoose";
import { Audits } from "../models/auditsModel";
import { Inventory } from "../models/inventoryModel";



const billingWorker = new Worker("billingQueue",
    async (job) => {
        try {
            const { subscriptionId, userId, productId, centerId, amount } = job.data
            const subscription = await Subs.findOne({ _id: subscriptionId } as any)
            if (!subscription) {
                console.log("subs not found", subscriptionId)
                return
            }
            const paymentSuccess = Math.random() > 0.3

            const payAttempts = await PayAttempts.create({
                subscriptionId: subscription._id,
                amount: 10,
                status: paymentSuccess ? "SUCCESS" : "FAILED"
            })

            try {
                await Audits.create({
                    entityType: "PayAttempts",
                    entityId: payAttempts._id,
                    action: "CREATE"
                })
            } catch (error) {
                console.log("Audit error in the payment Attempt", error)
            }

            if (!paymentSuccess) {
                 await Subs.findByIdAndUpdate(subscriptionId, {
                   status: "PAST_DUE"
               }, {new: true} as any)
                console.log("billing not success")
                return
            }
            const inventory = await Inventory.findOneAndUpdate({
                productId: new Types.ObjectId(productId),
                centerId: new Types.ObjectId(centerId),
                quantity: { $gte: 1 }
            } as any,
                {
                    $inc: { quantity: -1 }
                },
                { new: true } as any)

            if (!inventory) {
                try {
                    await Audits.create({
                        entityType: "Inventory",
                        entityId: new Types.ObjectId(productId),
                        action: "No stocks"
                    })
                } catch (error) {
                    console.log("Audit error in the inventory", error)
                }
                console.log("no inventory")
                await Subs.findByIdAndUpdate(subscriptionId, {
                   status: "REVIEW"
               }, {new: true} as any)
                return
            }

            const inv = inventory as any;
            try {
                await Audits.create({
                    entityType: "Inventory",
                    entityId: inv._id,
                    action: "deduction"
                })
            } catch (error) {
                console.log("Audit error in the inventory deduction", error)
            }
            const order = await Orders.create({
                userId,
                subscriptionId: subscription._id,
                productId,
                centerId,
                amount,
                quantity: 1,
                status: "PENDING"
            })

             try {
                await Audits.create({
                    entityType: "Orders",
                    entityId: order._id,
                    action: "created"
                } as any)
            } catch (error) {
                console.log("Audit error in the Order creation", error)
            }

          const nextBill =  subscription.nextBillingDate = new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )

            await Subs.findByIdAndUpdate(subscriptionId, {
                status: "ACTIVE",
                nextBillingDate: nextBill
            }, {new: true} as any)
            console.log("Payment success and the order is created")

        } catch (error) {
            console.log("billing worker err", error)
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
)

export default billingWorker