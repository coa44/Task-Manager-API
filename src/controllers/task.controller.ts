import { Request, Response } from "express";

import DataService from "../services/data.service";
import { isDateValid } from "../common/utils";

class TaskController {
  getAllTasks(req: Request, res: Response): void {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 100;

    const result = DataService.getTasks(page, pageSize);
    res.status(200).json({ ...result, page, pageSize });
  }

  getTask(req: Request, res: Response): void {
    const taskId = req.params.id;
    const task = DataService.getTaskById(Number(taskId));

    if (task === null) {
      res.status(404).json({ message: `Task with id=${taskId} was not found` });
      return;
    }

    res.status(200).json({ task });
  }

  createTask(req: Request, res: Response): void {
    const body = req.body;
    const { title, description, completed, dueDate } = body;

    if (!isDateValid(dueDate)) {
      res.status(400).json({ message: "Due date cannot be in the past." });
      return;
    }

    const createdTask = DataService.createTask(
      title,
      description,
      completed,
      dueDate
    );
    res.status(201).json({ createdTask });
  }

  updateTask(req: Request, res: Response): void {
    const body = req.body;
    const taskId = req.params.id;
    const { title, description, completed, dueDate } = body;

    if (!isDateValid(dueDate)) {
      res.status(400).json({ message: "Due date cannot be in the past." });
      return;
    }

    const updatedTask = DataService.updateTask(
      Number(taskId),
      title,
      description,
      completed,
      dueDate
    );
    if (updatedTask === null) {
      res
        .status(404)
        .json({ message: `Task with id=${taskId} was not found.` });
      return;
    }

    res.status(200).json({ updatedTask });
  }

  deleteTask(req: Request, res: Response): void {
    const taskId = req.params.id;

    const deletedTask = DataService.deleteTask(Number(taskId));
    if (deletedTask === null) {
      res.status(404).json({ message: `Task with id=${taskId} was not found` });
      return;
    }

    res.status(200).json({ deletedTask });
  }
}

export default new TaskController();
