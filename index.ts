import app from "./src/app"
import { configs } from "./src/configs/envConfig"
import { mongoConnect } from "./src/configs/mongo"
import "./src/workerFolder/billingWorker"
import { runBillingScheduler } from "./src/jobs/subsScheduler"

const port = configs.Port

await mongoConnect()

await runBillingScheduler()

console.log(`server is running on port ${port}`)

Bun.serve({
    port,
    fetch: app.fetch
})