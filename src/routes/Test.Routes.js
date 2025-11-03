import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Testing Api");

});

export default router;
