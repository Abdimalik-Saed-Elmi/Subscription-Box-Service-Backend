import { Hono } from "hono";
import { createSubs } from "../controllers/subsController";

const subsRoute = new Hono()

subsRoute.post("/", createSubs)


export default subsRoute
