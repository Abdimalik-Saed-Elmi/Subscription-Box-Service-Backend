import { Queue } from "bullmq";
import { Subs } from "../models/subsModel";



const billingQueue = new Queue("billingQueue", {
    connection:{
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379
    }
})

export const runBillingScheduler = async ()=> {
    try {
        const today = new Date()
        const subscription = await Subs.find({
            status: "ACTIVE",
            nextBillingDate: {$lte: today}
        } as any)

        for (let i = 0; i < subscription.length; i++) {
          const sub = subscription[i];

          await billingQueue.add("processBilling", {
            subscriptionId : sub._id
          })
        }
        console.log(`today billing scheduler are : ${subscription.length}` )


    } catch (error) {
        console.log("Billing err", error)
    }
}