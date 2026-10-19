import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx"

import LoginForm from "../component/auth/LoginForm.jsx";
import RegistrationForm from "../component/auth/RegistrationForm.jsx";

import TaskForm from "../component/task/TaskForm.jsx";
import TaskPage from "../pages/task/TaskPage.jsx";
import UpdateTaskForm from "../component/task/UpdateTaskForm.jsx";
import DeleteTask from "../component/task/DeleteTask.jsx";
import TaskDetailsPage from "../pages/task/TaskDetailsPage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import AddSubtaskForm from "../component/subTask/AddSubtaskForm.jsx"
import UpdateSubtaskForm from "../component/subTask/UpdateSubtaskForm.jsx";
import DeleteSubtask from "../component/subTask/DeleteSubtask.jsx";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginForm />
            },
            {
                path: "register",
                element: <RegistrationForm />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "",
                        element: <TaskPage />
                    },

                    {
                        path: "tasks/add",
                        element: <TaskForm />
                    },

                    {
                        path: "tasks/update/:taskId",
                        element: <UpdateTaskForm />
                    },
                    {
                        path: "tasks/delete/:taskId",
                        element: <DeleteTask />
                    },

                    {
                        path: "tasks/:taskId",
                        element: <TaskDetailsPage />,
                    },

                    {
                        path: "add-subtask/:taskId",
                        element: <AddSubtaskForm />
                    },

                    {
                        path: "/tasks/:taskId/subtasks/:subtaskId/update",
                        element: <UpdateSubtaskForm />
                    },

                    {
                        path: "/tasks/:taskId/subtasks/:subtaskId/delete",
                        element: <DeleteSubtask/>
                    }


                ]
            }
        ]
    }
]);

export default AppRoutes;