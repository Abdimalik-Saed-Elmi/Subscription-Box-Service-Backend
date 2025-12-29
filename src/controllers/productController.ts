import type { Context } from "hono";
import { Products } from "../models/productModel";


export const createProduct = async (c: Context)=>{
  const user =  c.get("user")
    if (!user || user.role !== "ADMIN") {
      return c.json({err: "Forbidden"}, 403)
    }

    const {name, sku, description} = await c.req.json();
    const product = await Products.create({
        name,
        sku,
        description
    })
return c.json(product, 201)
}

export const getAllProducts =  async (c: Context )=>{
    const products = await Products.find()
   return  c.json(products)
}
