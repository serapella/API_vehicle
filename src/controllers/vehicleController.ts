import { Request, Response } from "express";
import { Vehicle, IVehicle } from "../models/vehicleModel.js";

const getLicenseType = (cilinderinhoud: number): string => {
  if (cilinderinhoud <= 125) return "A1";
  if (cilinderinhoud <= 500) return "A2";
  return "A";
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { type, minPrijs, maxPrijs, page = 1, limit = 10 } = req.query;

    const query: Record<string, any> = {};

    if (type) {
      query.type = type;
    }

    if (minPrijs || maxPrijs) {
      query.prijs = {};
      if (minPrijs) query.prijs.$gte = Number(minPrijs);
      if (maxPrijs) query.prijs.$lte = Number(maxPrijs);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const vehicles = await Vehicle.find(query).skip(skip).limit(Number(limit));

    const total = await Vehicle.countDocuments(query);

    const vehiclesWithLicense = vehicles.map((vehicle: IVehicle) => {
      const vehicleObj = vehicle.toObject();
      if (vehicle.type === "moto") {
        vehicleObj.rijbewijs = getLicenseType(vehicle.cilinderinhoud || 0);
      }
      return vehicleObj;
    });

    res.status(200).json({
      vehicles: vehiclesWithLicense,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};
