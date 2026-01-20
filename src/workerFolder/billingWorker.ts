import { Worker } from "bullmq";
import { Subs } from "../models/subsModel";
import { PayAttempts } from "../models/paymentAttemptModel";
import { Orders } from "../models/orderModel";
import { Types } from "mongoose";
import { Audits } from "../models/auditsModel";
import { Inventory } from "../models/inventoryModel";
import { Centers } from "../models/centersModels";



const getNearestCenters = async (userLng: number, userLat: number) => {
  return Centers.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [userLng, userLat], 
        },
        $maxDistance: 500000, 
      },
    },
  } as any).lean();
};

// Helper: atomic inventory decrement with fallback across centers
const deductInventoryNearestFallback = async (productId: any, centers: any[]) => {
  for (const center of centers) {
    const updated = await Inventory.findOneAndUpdate(
      {
        productId: new Types.ObjectId(productId),
        centerId: center._id,
        quantity: { $gte: 1 },
      } as any,
      { $inc: { quantity: -1 } },
      { new: true } as any
    );

    if (updated) {
      return { inventory: updated, centerId: center._id };
    }
  }
  return null;
};

const billingWorker = new Worker(
  "billingQueue",
  async (job) => {
    try {
      const { subscriptionId } = job.data;

      const subscription = await Subs.findOne({ _id: subscriptionId } as any)
        .populate("plan")
        .populate("product");

      if (!subscription) {
        console.log("subs not found", subscriptionId);
        return;
      }

      const userId = subscription.user;
      const productId = subscription.product;
      const amount = subscription.plan.price;


      const userLat = Number((subscription as any).userLat ?? process.env.DEFAULT_USER_LAT ?? 2.0469);
      const userLng = Number((subscription as any).userLng ?? process.env.DEFAULT_USER_LNG ?? 45.3182);

      const paymentSuccess = Math.random() > 0.3;

      const payAttempts = await PayAttempts.create({
        subscription: subscription._id,
        amount: 10,
        status: paymentSuccess ? "SUCCESS" : "FAILED",
      });

      try {
        await Audits.create({
          entityType: "PayAttempts",
          entityId: payAttempts._id,
          action: "CREATE",
        });
      } catch (error) {
        console.log("Audit error in the payment Attempt", error);
      }

      if (!paymentSuccess) {
        await Subs.findByIdAndUpdate(
          subscriptionId,
          { status: "PAST_DUE" },
          { new: true } as any
        );
        console.log("billing not success");
        return;
      }

      const nearestCenters = await getNearestCenters(userLng, userLat);

      if (!nearestCenters.length) {
        console.log("no centers found for nearest query");
        await Subs.findByIdAndUpdate(
          subscriptionId,
          { status: "REVIEW" },
          { new: true } as any
        );
        return;
      }

      const result = await deductInventoryNearestFallback(productId, nearestCenters);

      if (!result) {
        try {
          await Audits.create({
            entityType: "Inventory",
            entityId: new Types.ObjectId(productId),
            action: "No stocks across centers",
          });
        } catch (error) {
          console.log("Audit error in the inventory", error);
        }

        console.log("no inventory across all centers");
        await Subs.findByIdAndUpdate(
          subscriptionId,
          { status: "REVIEW" },
          { new: true } as any
        );
        return;
      }

      const inventory = result.inventory as any;
      const selectedCenterId = result.centerId;

      try {
        await Audits.create({
          entityType: "Inventory",
          entityId: inventory._id,
          action: "deduction",
        });
      } catch (error) {
        console.log("Audit error in the inventory deduction", error);
      }

      const order = await Orders.create({
        user: userId,
        subscription: subscription._id,
        product: productId,
        center: selectedCenterId,
        amount,
        quantity: 1,
        status: "PENDING",
      });

      try {
        await Audits.create({
          entityType: "Orders",
          entityId: order._id,
          action: "created",
        } as any);
      } catch (error) {
        console.log("Audit error in the Order creation", error);
      }

      const nextBill = (subscription.nextBillingDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ));

      await Subs.findByIdAndUpdate(
        subscriptionId,
        {
          status: "ACTIVE",
          nextBillingDate: nextBill,
        },
        { new: true } as any
      );

      console.log("Payment success and the order is created");
    } catch (error) {
      console.log("billing worker err", error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  }
);

export default billingWorker;
