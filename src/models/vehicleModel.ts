import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["auto", "moto"],
      required: true,
      trim: true,
    },
    merk: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    bouwjaar: {
      type: Number,
      required: true,
    },
    prijs: {
      type: Number,
      required: true,
    },
    cilinderinhoud: {
      type: Number,
      required: function (this: any) {
        return this.type === "moto";
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
