import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { 
  createProject,
  getProjects,
  getProjectById
} from "../controllers/project.controller.js";
import { 
  createTask,
  // calculateSchedule,
  getProjectTasks
} from "../controllers/task.controller.js";

const router = express.Router();

// Project CRUD routes
router.post("/projects/create-project", verifyToken, createProject);
router.get("/projects/get-projects", verifyToken, getProjects);
router.get("/projects/get-project/:id", verifyToken, getProjectById);

// // Task routes within projects
router.post("/tasks/:projectId/create-task", verifyToken, createTask);
// router.post("/tasks/:projectId/schedule", protect, calculateSchedule);
router.get("/tasks/:projectId/get-tasks", verifyToken, getProjectTasks);

export default router;