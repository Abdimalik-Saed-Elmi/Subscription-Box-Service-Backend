import { Hono, type Context, type Next } from "hono";
import { createCenter, listCenters, updateCenter } from "../controllers/centersController";

const centersRoute = new Hono();

centersRoute.use("*", async (c: Context, next: Next) => {
  const user = c.get("user");
  if (!user || user.role !== "ADMIN") {
    return c.json({ err: "Forbidden" }, 403);
  }
  await next();
});

// CRUD
centersRoute.post("/", createCenter);
centersRoute.get("/", listCenters);
centersRoute.patch("/:id", updateCenter);

export default centersRoute;
