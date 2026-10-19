import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import subtaskRoutes from "./routes/subTaskRoutes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/subtask", subtaskRoutes);

export default app;