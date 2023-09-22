import express from "express";
import AuthController from "../controllers/authController.js";
const router = express.Router();

router
  .post("/auth/login", AuthController.login);

export default router;
