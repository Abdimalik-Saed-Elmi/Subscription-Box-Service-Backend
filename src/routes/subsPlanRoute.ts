import { Hono, type Context, type Next } from "hono";
import { createsubsPlan, getAllSubsPlan } from "../controllers/subsPlanController";

const subsPlanRoute = new Hono()

subsPlanRoute.use("*", async (c: Context, next: Next)=>{
  const user = c.get("user")
    if (!user || user.role !== "ADMIN") {
      return c.json({err: "Forbidden"}, 403)
    }
    await next()
})

subsPlanRoute.post("/", createsubsPlan)
subsPlanRoute.get("/", getAllSubsPlan)


export default subsPlanRoute