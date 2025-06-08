import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, startdate, enddate } = req.body;
    const owner = req.user._id; // From auth middleware

    const project = new Project({ name, startdate, enddate, owner });
    await project.save();

    res.status(201).json({
      _id: project._id,
      name: project.name,
      startdate:project.startdate,
      enddate:project.enddate,
      owner:project.owner,
      createdAt: project.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects for authenticated user
export const getProjects = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated

    // Step 1: Get user's projects
    const projects = await Project.find({ owner: userId }).lean();

    // Step 2: For all project IDs, get task stats
    const stats = await Task.aggregate([
      {
        $match: {
          project: { $in: projects.map(p => p._id) }
        }
      },
      {
        $group: {
          _id: "$project",
          totalTasks: { $sum: 1 },
          totalDuration: { $sum: "$duration" }
        }
      }
    ]);

    // Step 3: Map stats to project objects
    const projectStatsMap = new Map();
    stats.forEach(stat => {
      projectStatsMap.set(stat._id.toString(), stat);
    });

    const finalProjects = projects.map(project => {
      const stat = projectStatsMap.get(project._id.toString()) || {
        totalTasks: 0,
        totalDuration: 0
      };

      return {
        ...project,
        totalTasks: stat.totalTasks,
        totalDuration: stat.totalDuration
      };
    });

    return res.status(200).json(finalProjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    }).select("_id name startdate enddate createdAt");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};