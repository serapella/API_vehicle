import swaggerJSDoc from "swagger-jsdoc";
import { Vehicle } from "./models/vehicleModel";
import { create } from "domain";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description: "API voor verkoop van voertuigen",
    },
    servers: [
      process.env.NODE_ENV !== "production"
        ? {
            url: "http://localhost:3000/api",
            description: "Development server",
          }
        : {
            url: process.env.API_URL,
            description: "Production server",
          },
    ],
    components: {
      schemas: {
        Vehicle: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            type: {
              type: "string",
              enum: ["auto", "moto"],
            },
            merk: {
              type: "string",
            },
            model: {
              type: "string",
            },
            bouwjaar: {
              type: "number",
            },
            prijs: {
              type: "number",
            },
            cilinderinhoud: {
              type: "number",
            },
            rijbewijs: {
              type: "string",
              enum: ["A1", "A2", "A"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Vehicles",
        description: "Vehicle management endpoints",
      },
    ],
  },
  apis: ["**/*.ts"],
};

export const specs = swaggerJSDoc(options);
