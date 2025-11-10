import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://172.20.0.4:5173"
  ],
  credentials: true,
}));
app.use(express.json());
app.use(compression());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/", routes);

export default app;
