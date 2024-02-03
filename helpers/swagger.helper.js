const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";

swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "REST API MultiRole",
      version: "1.0.0",
      description: "REST API MultiRole Documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
      {
        url: "http://localhost:3000",
      },
    ]
  },
  apis: [
    "./routes/v1/AuthRoute.js",
    "./routes/v1/ProductRoute.js",
    "./routes/v1/UserRoute.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customCssUrl: CSS_URL,
};

module.exports = swaggerUi.setup(swaggerDocs, options);