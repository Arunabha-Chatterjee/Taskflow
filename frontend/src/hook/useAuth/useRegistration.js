import { useState } from "react";
import { registerUser } from "../../services/authService.js";

const useRegistration = () => {
    const [isRegistration, setIsRegistration] = useState(false);

    const registration = async (userData) => {
        try {
            setIsRegistration(true);

            const response = await registerUser(userData);

            return response;
        } finally {
            setIsRegistration(false);
        }
    };

    return {
        isRegistration,
        registration
    };
};

export default useRegistration;