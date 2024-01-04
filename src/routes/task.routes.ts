import { Router } from "express";

import taskController from "../controllers/task.controller";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import {
  validateCreateParams,
  validateId,
  validateUpdateParams,
} from "../common/request.validator";

const router = Router();

/**
 * Task route list in combination with express-validator validation and authentication middleware
 */
router.get("/", taskController.getAllTasks);
router.get("/:id", validateId, taskController.getTask);
router.post(
  "/",
  authenticationMiddleware,
  validateCreateParams,
  taskController.createTask
);
router.put(
  "/:id",
  authenticationMiddleware,
  validateUpdateParams,
  taskController.updateTask
);
router.delete(
  "/:id",
  authenticationMiddleware,
  validateId,
  taskController.deleteTask
);

export default router;
