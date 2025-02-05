import express from "express";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  getVehicleById,
  deleteVehicle,
} from "../controllers/vehicleController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - type
 *         - merk
 *         - model
 *         - bouwjaar
 *         - prijs
 *       properties:
 *         type:
 *           type: string
 *           enum: [auto, moto]
 *         merk:
 *           type: string
 *         model:
 *           type: string
 *         bouwjaar:
 *           type: number
 *         prijs:
 *           type: number
 *         cilinderinhoud:
 *           type: number
 *           description: Required only for motorcycles
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: object
 */

router.get("/", getVehicles);
router.post("/", addVehicle);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
