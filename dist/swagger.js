import swaggerJsdoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Event API',
            version: '1.0.0',
            description: 'API for managing events',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'API Server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API routes
};
export const specs = swaggerJsdoc(options);
