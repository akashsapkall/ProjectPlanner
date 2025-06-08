import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    precedenceTasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
    startDay: {
      type: Number,
      default: 1 // -1 indicates not scheduled yet
    },
    endDay: {
      type: Number,
      default: 1
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);