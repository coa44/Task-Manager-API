import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Validation middleware used in route validations
 */
export const validationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default validationMiddleware;
