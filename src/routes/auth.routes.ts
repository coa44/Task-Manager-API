import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateRegisterParams } from "../common/request.validator";

const router = Router();

/**
 * Authentication route list in combination with express-validator validation
 */
router.post("/register", validateRegisterParams, authController.register);
router.post("/login", authController.login);

export default router;
