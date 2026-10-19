import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div className="font-mono">
            <Toaster/>
                <Outlet />
        </div>
    );
};

export default App;