import { useState } from "react";
import { loginUser } from "../../services/authService.js";

const useLogin = () => {
    const [isLogin, setIsLogin] = useState(false);

    const login = async (userData) => {
        try {
            setIsLogin(true);

            const response = await loginUser(userData);

            localStorage.setItem("token", response.token);
            return response;

        } finally {
            setIsLogin(false);
        }
    };

    return {
        isLogin,
        login
    };
};

export default useLogin;