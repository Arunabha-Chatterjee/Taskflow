import express from "express";

import {
    registerController,
    loginController
} from "../controllers/authController.js";

import {
    registerValidator,
    loginValidator
} from "../validators/authValidator.js";

import validate from "../validators/validate.js";


const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    registerController
);

router.post(
    "/login",
    loginValidator,
    validate,
    loginController
);

export default router;