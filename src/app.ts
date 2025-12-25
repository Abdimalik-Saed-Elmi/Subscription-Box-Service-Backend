import { Hono } from "hono"
import productRoute from "./routes/productRoute"
import userRoute from "./routes/userRoute"
import subsPlanRoute from "./routes/subsPlanRoute"
import subsRoute from "./routes/subsRoute"
const app = new Hono

app.route("/product", productRoute)
app.route("/user", userRoute)
app.route("/plan", subsPlanRoute)
app.route("/subscription", subsRoute)
app.get("/good", (c) => {
    return c.json({status: "Good"})
})

export default app