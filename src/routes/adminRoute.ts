import { Hono, type Context, type Next } from "hono";
import { getAudits, getInventory, getOrders, getSubscriptions, getUsers } from "../controllers/adminController";



const adminRoute = new Hono

adminRoute.use("*", async (c: Context, next: Next)=>{
  const user = c.get("user")
    if (!user || user.role !== "ADMIN") {
      return c.json({err: "Forbidden"}, 403)
    }
    await next()
})


adminRoute.get("users", getUsers)
adminRoute.get("orders", getOrders)
adminRoute.get("subscriptions", getSubscriptions)
adminRoute.get("inventory", getInventory)
adminRoute.get("audits", getAudits)


export default adminRoute

