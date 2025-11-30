import express from "express";
import orderController from "../controllers/Order.Controller.js";
import { verifyToken } from "../middlewares/Token.Middlewares.js";

const router = express.Router();

// get
router.get("/", verifyToken, orderController.getOrder);

// post
router.post("/", orderController.postOrder);

// verify payment  // NOTE use this if verifyPayment used
// router.post("/verify", orderController.verifyPayment);

// delete
router.delete("/:id", orderController.deleteOrder);

// update
router.put("/:id", orderController.updateOrder);

// get order by email
router.get("/email", verifyToken, orderController.getOrderEmail);

// update status
router.put("/status/:id", orderController.updateStatus);

export default router;
