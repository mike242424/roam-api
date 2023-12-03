import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Roam API',
      version: '1.0.0',
      description: 'API documentation for Roam API',
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: [path.resolve('src/routes/*')],
};

export const specs = swaggerJsdoc(options);
