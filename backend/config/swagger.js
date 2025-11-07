import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple News API",
      version: "1.0.0",
      description: "API documentation for the Simple News MERN backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // files containing annotations
};

const specs = swaggerJsdoc(options);

export default specs;
