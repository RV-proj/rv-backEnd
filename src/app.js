// Import required modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Stripe from "stripe";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Import routes
import orderRoute from "./routes/Order.Routes.js";
import userRoute from "../src/routes/User.Route.js";
import bodyParser from "body-parser";
import orderController from "../src/controllers/Order.Controller.js";

// NOTE route for tiers reviewroute js remove this if being used
// import tiresRoute from "./routes/Tiers.Routes.js";
// import reviewRoute from "../src/routes/Review.Routes.js";

// Initialize Express app
const app = express();

// use limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// webhook api calling for payment
app.post(
  "/order/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res, next) => {
    req.stripe = stripe;

    next();
  },
  orderController.webhook
);

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(limiter);

// call stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// stripe middleware
app.use((req, res, next) => {
  req.stripe = stripe;
  next();
});

// Routes
// review
// NOTE review is not in use remove this comment when being used
// app.use("/review", reviewRoute);

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
