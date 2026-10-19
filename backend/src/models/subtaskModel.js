import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["TODO", "COMPLETED"],
            default: "TODO"
        }
    },
    {
        timestamps: true
    }
);

const Subtask = mongoose.model("Subtask", subtaskSchema);

export default Subtask;