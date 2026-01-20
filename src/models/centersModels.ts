import mongoose from "mongoose";

const centersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

centersSchema.index({ location: "2dsphere" });

export const Centers =
  mongoose.models.Centers || mongoose.model("Centers", centersSchema);
