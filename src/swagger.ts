import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description: "API for managing vehicles",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Production API Server",
      },
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
