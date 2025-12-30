import { Hono, type Context, type Next } from "hono";
import { createProduct, getAllProducts } from "../controllers/productController";

const productRoute = new Hono()

productRoute.use("*", async (c: Context, next: Next)=>{
  const user = c.get("user")
    if (!user || user.role !== "ADMIN") {
      return c.json({err: "Forbidden"}, 403)
    }
    await next()
})

productRoute.post("/", createProduct)
productRoute.get("/", getAllProducts)


export default productRoute