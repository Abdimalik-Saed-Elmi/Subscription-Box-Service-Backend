import { Hono } from "hono";
import { createProduct, getAllProducts } from "../controllers/productController";

const productRoute = new Hono()

productRoute.post("/", createProduct)
productRoute.get("/", getAllProducts)


export default productRoute