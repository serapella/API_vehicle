import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import vehicleRoutes from "./routes/vehicleRoutes";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
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
// Database connection
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection successful");
        return true;
    }
    catch (error) {
        console.error("Database connection error:", error);
        return false;
    }
};
// Start server
const startServer = async () => {
    const isConnected = await connectDB();
    if (!isConnected) {
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
