import express from 'express'
import { authenticateUser } from '../utils/JwtMiddleware.js';
import { createTask, deleteTask, getOneTask, getTaskList, markComplete, updateTask } from '../controllers/TaskController.js';
const router = express.Router();

router.post("/createTask", authenticateUser, createTask);
router.get("/getTask/:id", authenticateUser, getOneTask);
router.get("/getTaskList", authenticateUser, getTaskList);
router.put("/updateTask/:id", authenticateUser, updateTask);
router.delete("/deleteTask/:id", authenticateUser, deleteTask);
router.patch("/markComplete/:id", authenticateUser, markComplete);
// expo
export default router;