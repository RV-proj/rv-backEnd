import express from "express";
import orderController from "../controllers/Order.Controller.js";

const router = express.Router();

// get
router.get("/", orderController.getOrder);

// post
router.post("/", orderController.postOrder);

// delete
router.delete("/:id", orderController.deleteOrder);

// update
router.put("/:id", orderController.updateOrder);

// get order by email
router.get("/email", orderController.getOrderEmail);

export default router;
