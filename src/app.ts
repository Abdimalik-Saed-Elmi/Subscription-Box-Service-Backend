import { Hono } from "hono"
import productRoute from "./routes/productRoute"
import userRoute from "./routes/userRoute"
import subsPlanRoute from "./routes/subsPlanRoute"
import subsRoute from "./routes/subsRoute"
import { auth } from "./middlewares/auth"
import authRoute from "./routes/authRoute"
const app = new Hono

// Protected Middlewares
app.use("/product/*", auth)
app.use("/user/*", auth)
app.use("/plan/*", auth)
app.use("/subscription/*", auth)


app.route("/auth", authRoute)

// Routes
app.route("/product", productRoute)
app.route("/user", userRoute)
app.route("/plan", subsPlanRoute)
app.route("/subscription", subsRoute)
app.get("/good", (c) => {
    return c.json({status: "Good"})
})

export default app