import express from "express";
import { getVehicles, addVehicle, updateVehicle, getVehicleById, deleteVehicle, } from "../controllers/vehicleController";
const router = express.Router();
router.post("/", addVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
export default router;
