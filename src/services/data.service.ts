import { Task } from "../types/Task";
import { InitialTasks } from "../assets/InitialData";
import { User } from "../types/User";

class DataService {
  tasks: Array<Task> = InitialTasks;
  users: Array<User> = [];

  /**
   * Task related methods
   */
  getTasks(
    page: number,
    pageSize: number
  ): {
    tasks: Array<Task>;
    total: number;
  } {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      tasks: this.tasks.slice(startIndex, endIndex),
      total: this.tasks.length,
    };
  }

  getTaskById(taskId: number): Task | null {
    return this.tasks.find((t) => t.id === taskId) || null;
  }

  createTask(
    title: string,
    description: string = "",
    completed: boolean = false,
    dueDate: Date | null = null
  ): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      dueDate,
      completed,
    };
    this.tasks.unshift(newTask);
    return newTask;
  }

  updateTask(
    taskId: number,
    title: string,
    description: string = "",
    completed: boolean = false,
    dueDate: Date | null = null
  ): Task | null {
    const existingTask = this.getTaskById(taskId);
    if (existingTask === null) {
      return null;
    }

    existingTask.title = title;
    existingTask.description = description;
    existingTask.completed = completed;
    existingTask.dueDate = dueDate;

    return existingTask;
  }

  deleteTask(taskId: number): Task | null {
    const existingTask = this.getTaskById(taskId);
    if (existingTask === null) {
      return null;
    }
    const elementIndex = this.tasks.findIndex((t) => t.id === existingTask.id);
    this.tasks.splice(elementIndex, 1);

    return existingTask;
  }

  /**
   * User related methods
   */
  findUserByUsername(username: string): User | null {
    return this.users.find((u) => u.username === username) || null;
  }

  createUser(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ): User {
    const newUser: User = {
      id: this.users.length + 1,
      firstName,
      lastName,
      username,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }
}

export default new DataService();
