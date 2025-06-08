import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    startdate: {
      type: Date,
      default: Date.now, // current timestamp if not provided
    },

    enddate: {
      type: Date,
      default: null, // "no date" means null
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
