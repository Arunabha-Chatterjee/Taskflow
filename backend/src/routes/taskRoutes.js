import express from "express";

import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
} from "../controllers/taskController.js";

import { taskValidator } from "../validators/taskValidator.js";

import validate from "../validators/validate.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/add",
    authMiddleware,
    taskValidator,
    validate,
    createTaskController
);

router.get(
    "/get",
    authMiddleware,
    getAllTasksController
);

router.get(
    "/get/:id",
    authMiddleware,
    getTaskByIdController
);

router.put(
    "/update/:id",
    authMiddleware,
    taskValidator,
    validate,
    updateTaskController
);

router.delete(
    "/delete/:id",
    authMiddleware,
    deleteTaskController
);

export default router;