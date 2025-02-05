import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/voertuig", vehicleRoutes);

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "MONGODB_URI_LIVE:",
  process.env.MONGODB_URI_LIVE ? "Loaded" : "Not Found"
);

// Database connection
const connectDB = async (): Promise<boolean> => {
  try {
    const mongoUri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI_LIVE
        : process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};

// Start server
const startServer = async (): Promise<void> => {
  const isConnected = await connectDB();
  if (!isConnected) {
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
