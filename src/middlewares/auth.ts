import type { Context, Next } from "hono"
import { configs } from "../configs/envConfig"
import jwt from "jsonwebtoken"

export const auth = async (c: Context, next: Next) => {
 const auhtHeader = c.req.header("authorization")
 if (!auhtHeader || !auhtHeader.startsWith("Bearer")) {
   return c.json({err: "Not authorized"}, 401)
 }

 const tokens  = auhtHeader.split(" ")[1] as any

 try {
    const payload  = jwt.verify(tokens, configs.JWT_Secret)
    c.set("user", payload)
    await next()
 } catch (error) {console.log(error)}
}