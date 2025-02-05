// src/controllers/userController.ts
import { Request, Response } from "../models/UserModel";
import { Vehicle } from "../models/VehicleModel";

export const addToFavorites = async (userId: string, vehicleId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    // Voeg het voertuig toe aan favorieten
    user.favorieten.push(vehicleId);
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding to favorites");
  }
};
