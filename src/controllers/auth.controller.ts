import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import DataService from "../services/data.service";

const tokenSecret = process.env.TOKEN_SECRET;

class AuthController {
  register(req: Request, res: Response): void {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const username = body.username;
    const password = body.password;

    const existingUser = DataService.findUserByUsername(username);
    if (existingUser !== null) {
      res.status(400).json({
        message: `User with username=${username} is already registered.`,
      });
      return;
    }

    DataService.createUser(firstName, lastName, username, password);

    res.status(201).json({ message: "Registration was successfull." });
  }

  login(req: Request, res: Response): void {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const existingUser = DataService.findUserByUsername(username);
    const validUser =
      existingUser !== null && existingUser.password === password;
    if (!validUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      String(tokenSecret),
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
    });
  }
}

export default new AuthController();
