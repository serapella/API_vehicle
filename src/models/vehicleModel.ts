import mongoose from "mongoose";

export type VehicleType = "auto" | "moto";

export interface IVehicle extends mongoose.Document {
  type: VehicleType;
  merk: string;
  model: string;
  bouwjaar: number;
  prijs: number;
  cilinderinhoud?: number;
}

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["auto", "moto"],
    required: true,
  },
  merk: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
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
    required: function (this: IVehicle) {
      return this.type === "moto";
    },
  },
});

export const Vehicle = mongoose.model<IVehicle>("Vehicle", vehicleSchema);
