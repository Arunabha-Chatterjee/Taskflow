import { body } from "express-validator";

export const taskValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("priority")
        .optional()
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("Priority must be LOW, MEDIUM or HIGH"),

    body("status")
        .optional()
        .isIn(["TODO", "IN_PROGRESS", "COMPLETED"])
        .withMessage("Invalid task status"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Due date must be a valid date")
];