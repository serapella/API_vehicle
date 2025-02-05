import { Request, Response } from "express";
import { Vehicle } from "../models/VehicleModel";

const getLicenseType = (cilinderinhoud: number): string => {
  if (cilinderinhoud <= 125) return "A1";
  if (cilinderinhoud <= 500) return "A2";
  return "A";
};

// 🚗 Get all vehicles with optional filters and pagination
export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { type, minPrijs, maxPrijs, page = "1", limit = "10" } = req.query;

    const query: Record<string, any> = {};

    if (type) query.type = type;
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
      if (vehicle.type === "moto" && vehicle.cilinderinhoud) {
        vehicleObj.rijbewijs = getLicenseType(vehicle.cilinderinhoud);
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
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      });
  }
};

// 🏍️ Get a single vehicle by ID
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with id ${id} not found` });
    }

    const vehicleObj = vehicle.toObject();
    if (vehicle.type === "moto" && vehicle.cilinderinhoud) {
      vehicleObj.rijbewijs = getLicenseType(vehicle.cilinderinhoud);
    }

    res.status(200).json(vehicleObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      });
  }
};

// ➕ Add a new vehicle
export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { type, merk, model, bouwjaar, prijs, cilinderinhoud } = req.body;

    if (!type || !merk || !model || !bouwjaar || !prijs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vehicle = new Vehicle(req.body);

    if (type === "moto" && cilinderinhoud) {
      vehicle.rijbewijs = getLicenseType(cilinderinhoud);
    }

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      });
  }
};

// ✏️ Update an existing vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, cilinderinhoud } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with id ${id} not found` });
    }

    Object.assign(vehicle, req.body);

    if (type === "moto" && cilinderinhoud) {
      vehicle.rijbewijs = getLicenseType(cilinderinhoud);
    }

    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with id ${id} not found` });
    }

    res.status(200).json({ message: `Vehicle with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      });
  }
};
