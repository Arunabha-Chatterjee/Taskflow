import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (userData) => {
    try {
        const { name, email, password } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        return {
            user,
            token
        };

    } catch (error) {
        throw new Error(error.message);
    }
};