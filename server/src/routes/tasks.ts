import { Router } from "express";
import { fetchTasks, addTask, updTaskById, removeTask } from "../controllers/tasks";

const router = Router();

router.get("/tasks", fetchTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", updTaskById);
router.delete("/tasks/:id", removeTask);

export default router;
