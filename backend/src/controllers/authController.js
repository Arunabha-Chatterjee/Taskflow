import {
    registerUser,
    loginUser
} from "../services/authService.js";

export const registerController = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email
            }
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};