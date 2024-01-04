import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app: Application = express();

/**
 * Check environment variables and terminate further execution if setup is not valid
 */
const port = process.env.PORT;
const tokenSecret = process.env.TOKEN_SECRET;

if (!port || !tokenSecret) {
  throw new Error(
    "Could not start the application. Check your environent variables."
  );
}

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log("Application is running on PORT", port));
