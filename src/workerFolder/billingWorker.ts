import { Worker } from "bullmq";
import { Subs } from "../models/subsModel";
import { PayAttempts } from "../models/paymentAttemptModel";



const billingWorker = new Worker("billingQueue",
async(job)=>{
    try {
        const {subscriptionId} = job.data
        const subscription = await Subs.findOne({_id: subscriptionId} as any)
        if (!subscription) {
          console.log("subs not found", subscriptionId)
          return
        }
        const paymentSuccess = Math.random() > 0.3

        await PayAttempts.create({
            subscriptionId: subscription._id,
            amount: 10,
            status: paymentSuccess ? "SUCCESS" : "FAILED"
        })

        if (paymentSuccess) {
          subscription.nextBillingDate = new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
          )
          await subscription.save()
          console.log("billing ok", subscriptionId)
        } else {
            subscription.status = "PAST_DUE"
            await subscription.save()
            console.log("billing not success", subscriptionId)
        }
        
        
    } catch (error) {
        console.log("billing worker err", error)
    }
},
{
     connection:{
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379
    }
}
)

export default billingWorker