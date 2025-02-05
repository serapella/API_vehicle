import express from "express";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  getVehicleById,
  deleteVehicle,
} from "../controllers/vehicleController";

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
 *         _id:
 *           type: string
 *           description: The auto-generated id of the vehicle
 *         type:
 *           type: string
 *           enum: [auto, moto]
 *           description: The type of vehicle (car or motorcycle)
 *         merk:
 *           type: string
 *           description: The brand of the vehicle
 *         model:
 *           type: string
 *           description: The model of the vehicle
 *         bouwjaar:
 *           type: number
 *           description: The year the vehicle was built
 *         prijs:
 *           type: number
 *           description: The price of the vehicle
 *         cilinderinhoud:
 *           type: number
 *           description: Engine displacement (required only for motorcycles)
 *         rijbewijs:
 *           type: string
 *           enum: [A1, A2, A]
 *           description: Required license type (only for motorcycles)
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: object
 */

/**
 * @swagger
 * /voertuig:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [auto, moto]
 *         description: Filter by vehicle type
 *       - in: query
 *         name: minPrijs
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrijs
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of vehicles with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *                 totalPages:
 *                   type: number
 *                 currentPage:
 *                   type: number
 *                 total:
 *                   type: number
 *       500:
 *         description: Oops! Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: The vehicle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Oops! Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /voertuig/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Oops! Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: The vehicle was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Oops! Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: The vehicle was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Oops! Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get("/", getVehicles);
router.post("/", addVehicle);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
