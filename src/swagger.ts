import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description: "API voor verkoop van voertuigen",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "API Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
