import app from "./src/app"
import { configs } from "./src/configs/envConfig"
import { mongoConnect } from "./src/configs/mongo"

const port = configs.Port

await mongoConnect()

console.log(`server is running on port ${port}`)

Bun.serve({
    port,
    fetch: app.fetch
})