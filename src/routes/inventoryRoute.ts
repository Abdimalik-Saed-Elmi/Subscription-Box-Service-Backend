import { Hono, type Context, type Next } from "hono";
import { addInventory, updateInventory } from "../controllers/inventoryController";


const inventoryRoute = new Hono()

inventoryRoute.use("*", async (c: Context, next: Next)=>{
  const user = c.get("user")
    if (!user || user.role !== "ADMIN") {
      return c.json({err: "Forbidden"}, 403)
    }
    await next()
})

inventoryRoute.post("/", addInventory)
inventoryRoute.put("/", updateInventory)


export default inventoryRoute