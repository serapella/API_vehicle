import { Request, Response } from "express";
import { Vehicle, IVehicle } from "../models/vehicleModel.js";

const getLicenseType = (cilinderinhoud: number): string => {
  if (cilinderinhoud <= 125) return "A1";
  if (cilinderinhoud <= 500) return "A2";
  return "A";
};

export const getVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const vehiclesWithLicense = vehicles.map((vehicle) => {
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

export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }

    const vehicleObj = vehicle.toObject();
    if (vehicle.type === "moto") {
      vehicleObj.rijbewijs = getLicenseType(vehicle.cilinderinhoud || 0);
    }

    res.status(200).json(vehicleObj);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle", error });
  }
};

export const addVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = new Vehicle(req.body);
    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(400).json({ message: "Error creating vehicle", error });
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Error updating vehicle", error });
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error });
  }
};
