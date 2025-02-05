// src/controllers/vehicleController.ts
import { Request, Response } from "express";
import { Vehicle } from "../models/VehicleModel";

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { type, merk, model, bouwjaar, prijs, cilinderinhoud, rijbewijs } =
      req.body;

    const newVehicle = new Vehicle({
      type,
      merk,
      model,
      bouwjaar,
      prijs,
      cilinderinhoud,
      rijbewijs,
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Error adding vehicle" });
  }
};

// Get all vehicles or filter by parameters
export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { type, minPrijs, maxPrijs, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (type) query.type = type;
    if (minPrijs) query.prijs = { $gte: Number(minPrijs) };
    if (maxPrijs) query.prijs = { ...query.prijs, $lte: Number(maxPrijs) };

    const vehicles = await Vehicle.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await Vehicle.countDocuments(query);
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({ vehicles, total, totalPages, currentPage: page });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Error fetching vehicles" });
  }
};

// Get a specific vehicle by ID
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    res.status(500).json({ message: "Error fetching vehicle by ID" });
  }
};

// Update a vehicle by ID
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Error updating vehicle" });
  }
};

// Delete a vehicle by ID
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle successfully deleted" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Error deleting vehicle" });
  }
};
