import { Hono } from "hono"
import productRoute from "./routes/productRoute"
import userRoute from "./routes/userRoute"
import subsPlanRoute from "./routes/subsPlanRoute"
import subsRoute from "./routes/subsRoute"
import { auth } from "./middlewares/auth"
import authRoute from "./routes/authRoute"
import adminRoute from "./routes/adminRoute"
import inventoryRoute from "./routes/inventoryRoute"
const app = new Hono

// Protected Middlewares
app.use("/product/*", auth)
app.use("/user/*", auth)
app.use("/plan/*", auth)
app.use("/subscription/*", auth)
app.use("/admin/*", auth)
app.use("/admin/inventory/*", auth)


app.route("/auth", authRoute)

// Routes
app.route("/admin", adminRoute)
app.route("/product", productRoute)
app.route("/user", userRoute)
app.route("/plan", subsPlanRoute)
app.route("/subscription", subsRoute)
app.route("/admin/inventory", inventoryRoute)
app.get("/good", (c) => {
    return c.json({status: "Good"})
})

export default app