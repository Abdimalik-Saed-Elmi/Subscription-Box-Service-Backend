import { Hono } from "hono";
import { createsubsPlan, getAllSubsPlan } from "../controllers/subsPlanController";

const subsPlanRoute = new Hono()

subsPlanRoute.post("/", createsubsPlan)
subsPlanRoute.get("/", getAllSubsPlan)


export default subsPlanRoute