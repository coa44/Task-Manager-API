import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET;

/**
 * Basic authentication middleware using Bearer token for authentication
 */
const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  const token = bearerToken.replace("Bearer ", "");

  jwt.verify(token, String(tokenSecret), (err) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    next();
  });
};

export default authenticationMiddleware;
