// Import required modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import reviewRoute from "../src/routes/Review.Routes.js";
import orderRoute from "../src/routes/Order.Router.js";
import userRoute from "../src/routes/User.Route.js";

// NOTE route for tiers js remove this if being used
// import tiresRoute from "./routes/Tiers.Routes.js";

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

// order
app.use("/order", orderRoute);

// user
app.use("/user", userRoute);

// tiers
// NOTE tiers is not in use remove this comment when being used
// app.use("/tiers", tiresRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;
