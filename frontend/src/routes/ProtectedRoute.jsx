import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    const token = localStorage.getItem("token");
    //Not authenticated
    if (!token) {
        toast.error("Authenticate yourself for acess this endpoint");
        return <Navigate to="/login" replace />;
    }

    //Allowed
    return <Outlet />;
};

export default ProtectedRoute;