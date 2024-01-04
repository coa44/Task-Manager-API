import { body, param } from "express-validator";
import validationMiddleware from "../middlewares/validation.middleware";

const VALID_TASK_PARAMS = ["title", "description", "completed", "dueDate"];
const VALID_USER_PARAMS = ["firstName", "lastName", "username", "password"];

const validateId = [param("id").isInt().toInt(), validationMiddleware];

const validateCreateParams = [
  body()
    .custom((body) => {
      const keys = VALID_TASK_PARAMS;
      return Object.keys(body).every((key) => keys.includes(key));
    })
    .withMessage(
      `Supported task create parameters: [${VALID_TASK_PARAMS.join(", ")}]`
    ),
  body("title").exists().isLength({ min: 2 }),
  body("description").optional(),
  body("completed").optional().isBoolean(),
  body("dueDate")
    .optional()
    .custom((value, { req }) => {
      if (value !== null && value !== "null") {
        return !isNaN(new Date(value).getTime());
      }
      return true;
    }),
  validationMiddleware,
];

const validateRegisterParams = [
  body()
    .custom((body) => {
      const keys = VALID_USER_PARAMS;
      return Object.keys(body).every((key) => keys.includes(key));
    })
    .withMessage(
      `Supported user registration parameters: [${VALID_USER_PARAMS.join(
        ", "
      )}]`
    ),
  body("firstName").exists().isLength({ min: 2, max: 25 }),
  body("lastName").exists().isLength({ min: 2, max: 25 }),
  body("username").exists().isLength({ min: 2, max: 25 }),
  body("password").exists().isLength({ min: 2, max: 25 }),
  validationMiddleware,
];

const validateUpdateParams = [...validateId, ...validateCreateParams];

export {
  validateId,
  validateCreateParams,
  validateUpdateParams,
  validateRegisterParams,
};
