import express from "express";
import { getEvents, addEvent, updateEvent, getEventsById, deleteEvent, } from "../controllers/eventController";
const router = express.Router();
router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/", addEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
export default router;
