// Import required modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import reviewRoute from "../src/routes/Review.Routes.js";
import tiresRoute from "./routes/TiersRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
// review
app.use("/review", reviewRoute);
app.use("/tiers", tiresRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;
