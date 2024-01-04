import { InitialTasks } from "../assets/InitialData";
import DataService from "../services/data.service";

describe("DataService", () => {
  beforeEach(() => {
    // Reset data before each test
    DataService.tasks = InitialTasks.slice();
    DataService.users = [];
  });

  describe("getTasks", () => {
    test("Should return correct tasks based on page and pageSize", () => {
      const result = DataService.getTasks(1, 5);
      expect(result.tasks.length).toBe(5);
      expect(result.total).toBe(InitialTasks.length);
    });
  });

  describe("getTaskById", () => {
    test("Should return task if taskId exists", () => {
      const taskId = 1;
      const result = DataService.getTaskById(taskId);
      expect(result).toEqual(InitialTasks.find((t) => t.id === taskId));
    });

    test("should return null if taskId does not exist", () => {
      const taskId = 999;
      const result = DataService.getTaskById(taskId);
      expect(result).toBeNull();
    });
  });

  describe("createTask", () => {
    test("should create a new task and return it", () => {
      const title = "New Task";
      const description = "Description for the new task";
      const completed = false;
      const dueDate = new Date();
      const result = DataService.createTask(
        title,
        description,
        completed,
        dueDate
      );

      expect(result.title).toBe(title);
      expect(result.description).toBe(description);
      expect(result.dueDate).toBe(dueDate);
      expect(result.completed).toBe(false);
      expect(DataService.tasks).toContain(result);
    });
  });

  describe("deleteTask", () => {
    test("Should delete a task", () => {
      expect(DataService.getTaskById(4)).not.toBeNull();
      DataService.deleteTask(4);
      expect(DataService.getTaskById(4)).toBeNull();
    });
  });
});
