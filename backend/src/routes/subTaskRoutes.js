import express from "express";

import {
    createSubtaskController,
    getSubtasksController,
    updateSubtaskController,
    deleteSubtaskController,
    getSubtaskController
} from "../controllers/subTaskController.js";

import { subTaskValidator } from "../validators/subTaskValidator.js";

import validate from "../validators/validate.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/add/:taskId",
    authMiddleware,
    subTaskValidator,
    validate,
    createSubtaskController
);

router.get(
    "/get/:taskId",
    authMiddleware,
    getSubtasksController
);

router.get(
    "/get/:taskId/:subtaskId",
    authMiddleware,
    getSubtaskController
);

router.put(
    "/update/:taskId/:subtaskId",
    authMiddleware,
    subTaskValidator,
    validate,
    updateSubtaskController
);

router.delete(
    "/delete/:taskId/:subtaskId",
    authMiddleware,
    deleteSubtaskController
);

export default router;