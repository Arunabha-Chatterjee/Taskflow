import { body } from "express-validator";

export const subTaskValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage("Title must be between 2 and 100 characters"),
    
    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("status")
        .isIn(["TODO", "COMPLETED"])
        .withMessage("Status must be TODO or COMPLETED")
];