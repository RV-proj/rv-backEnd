import express from "express";
import {
  googleSignIn,
  googleCallback,
  getSession,
} from "../controllers/Auth.controller.js";

const router = express.Router();

// get
router.get("/google", googleSignIn);
router.get("/callback", googleCallback);
router.get("/session", getSession);

export default router;
