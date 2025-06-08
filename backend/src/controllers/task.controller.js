import { Task } from "../models/task.models.js";
import { Project } from "../models/project.models.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, duration, precedenceTasks = [] } = req.body;
    // Validate project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    let maxEndDay = 0;

    // Validate and fetch precedence tasks
    if (precedenceTasks.length > 0) {
      const validDependencies = await Task.find({
        _id: { $in: precedenceTasks },
        project: projectId,
      });

      if (validDependencies.length !== precedenceTasks.length) {
        return res.status(400).json({ error: "Invalid task dependencies" });
      }

      // Get the maximum endDay from valid precedence tasks
      maxEndDay = Math.max(...validDependencies.map((task) => task.endDay || 0));
    }

    // Calculate start and end days
    const startDay = maxEndDay;
    const endDay = startDay + duration;

    // Create task
    const task = new Task({
      name,
      duration,
      precedenceTasks,
      project: projectId,
      startDay,
      endDay,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Calculate project schedule
// export const calculateSchedule = async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     // Get all tasks for project
//     const tasks = await Task.find({ project: projectId });
//     if (tasks.length === 0) {
//       return res.status(400).json({ error: "No tasks found for this project" });
//     }

//     // Prepare data structures
//     const taskMap = new Map();
//     const graph = new Map();
//     const inDegree = new Map();
//     const earliestStart = new Map();

//     // Initialize data structures
//     tasks.forEach(task => {
//       taskMap.set(task._id.toString(), task);
//       graph.set(task._id.toString(), []);
//       inDegree.set(task._id.toString(), task.precedenceTasks.length);
//       earliestStart.set(task._id.toString(), 0);
//     });

//     // Build graph and update in-degrees
//     tasks.forEach(task => {
//       task.precedenceTasks.forEach(precedenceId => {
//         const precIdStr = precedenceId.toString();
//         graph.get(precIdStr).push(task._id.toString());
//       });
//     });

//     // Topological sort using Kahn's algorithm
//     const queue = [];
//     const scheduledOrder = [];

//     // Find starting nodes (in-degree 0)
//     tasks.forEach(task => {
//       const taskId = task._id.toString();
//       if (inDegree.get(taskId) === 0) {
//         queue.push(taskId);
//         task.startDay = 0;
//         task.endDay = task.duration;
//         earliestStart.set(taskId, 0);
//       }
//     });

//     // Process the queue
//     while (queue.length > 0) {
//       const taskId = queue.shift();
//       scheduledOrder.push(taskId);

//       for (const dependentId of graph.get(taskId)) {
//         // Update earliest start time for dependent task
//         const currentStart = earliestStart.get(dependentId);
//         const newStart = taskMap.get(taskId).endDay;
//         if (newStart > currentStart) {
//           earliestStart.set(dependentId, newStart);
//         }

//         // Reduce in-degree and enqueue if ready
//         inDegree.set(dependentId, inDegree.get(dependentId) - 1);
//         if (inDegree.get(dependentId) === 0) {
//           const dependentTask = taskMap.get(dependentId);
//           dependentTask.startDay = earliestStart.get(dependentId);
//           dependentTask.endDay = dependentTask.startDay + dependentTask.duration;
//           queue.push(dependentId);
//         }
//       }
//     }

//     // Check for cycles
//     if (scheduledOrder.length !== tasks.length) {
//       return res.status(400).json({ error: "Cycle detected in task dependencies" });
//     }

//     // Update tasks in database
//     const updatePromises = tasks.map(task => task.save());
//     await Promise.all(updatePromises);

//     res.json({
//       message: "Schedule calculated successfully",
//       tasks: tasks.map(t => ({
//         _id: t._id,
//         name: t.name,
//         duration: t.duration,
//         startDay: t.startDay,
//         endDay: t.endDay,
//         precedenceTasks: t.precedenceTasks
//       }))
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get tasks for Gantt chart
export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    // console.log("fgdvfgdyfh___01");
    const tasks = await Task.find({ project: projectId })
    .select("name duration startDay endDay precedenceTasks")
    .lean();
    // console.log("fgdvfgdyfh___02");

    res.json(tasks.map(task => ({
      ...task,
      precedenceTasks: task.precedenceTasks.map(id => id.toString())
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};