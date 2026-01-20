import type { Context } from "hono";
import { Centers } from "../models/centersModels";

export const createCenter = async (c: Context) => {
  const { name, lat, lng } = await c.req.json();

  if (!name || lat == null || lng == null) {
    return c.json({ error: "name, lat, lng are required" }, 400);
  }

  const center = await Centers.create({
    name,
    location: {
      type: "Point",
      coordinates: [Number(lng), Number(lat)],
    },
  });

  return c.json(center, 201);
};

export const listCenters = async (c: Context) => {
  const centers = await Centers.find().sort({ createdAt: -1 });
  return c.json(centers);
};

export const updateCenter = async (c: Context) => {
  const id = c.req.param("id");
  const { name, lat, lng } = await c.req.json();

  const update: any = {};
  if (name) update.name = name;

  if (lat != null && lng != null) {
    update.location = {
      type: "Point",
      coordinates: [Number(lng), Number(lat)],
    };
  }

  const center = await Centers.findByIdAndUpdate(id, update, { new: true });
  if (!center) return c.json({ error: "Center not found" }, 404);

  return c.json(center);
};
