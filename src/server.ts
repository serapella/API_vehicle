import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import vehicleRoutes from "./routes/vehicleRoutes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { exit } from "process";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description:
        "API for managing vehicles with support for cars and motorcycles",
    },
    servers: [
      process.env.NODE_ENV !== "production"
        ? { url: "http://localhost:3000", description: "Development server" }
        : { url: process.env.API_URL, description: "Production server" },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Swagger UI

// Routes
app.use("/voertuig", vehicleRoutes);

// Connect to MongoDB and start the server
(async () => {
  try {
    const mongoUri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI_LIVE
        : process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI environment variable is not set");
    }

    await mongoose.connect(mongoUri);
    console.log(`✅ Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    exit(1);
  }
})();
