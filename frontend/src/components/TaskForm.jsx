// src/components/TaskForm.jsx
import { useState, useEffect } from "react";
import api from "../utils/api";

const TaskForm = ({ projectId, onSave, onCancel }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [taskData, setTaskData] = useState({
    name: "",
    duration: 1,
    precedenceTasks: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing tasks for precedenceTasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/tasks/${projectId}/get-tasks`);
        if (response.status === 200 || response.status === 201) {
          setTasks(response.data);
        } else {
          setError("Unable to load project tasks.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong while fetching tasks."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchTasks();
  }, [projectId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'duration'){
      setTaskData((prev) => ({ ...prev, [name]: Number(value) }));
    }
    else{
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDependencyChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setTaskData((prev) => ({ ...prev, precedenceTasks: selectedIds }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!taskData.name.trim()) newErrors.name = "Task name is required";
    // console.log("DURATION"+ typeof taskData.duration);
    if (taskData.duration <= 0)
      newErrors.duration = "Duration must be at least 1 day";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post(
        `/tasks/${projectId}/create-task`,
        taskData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 || response.status === 201) {
        setTaskData({ name: "", duration: 1, precedenceTasks: [] }); // reset form
        onSave(); // trigger refresh in parent
      } else {
        setError("Task creation failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create task. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <p className="text-white text-lg">Loading task form...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Task</h2>

        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-gray-300 mb-1">Task Name *</label>
            <input
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleChange}
              placeholder="Enter task name"
              className={`w-full px-4 py-3 bg-gray-700 border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-300 mb-1">
              Duration (days) *
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              value={taskData.duration}
              onChange={handleChange}
              placeholder="1"
              className={`w-full px-4 py-3 bg-gray-700 border ${
                errors.duration ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.duration && (
              <p className="text-red-400 text-sm mt-1">{errors.duration}</p>
            )}
          </div>

          {/* precedenceTasks */}
          <div>
            <label className="block text-gray-300 mb-1">Precedence Tasks</label>
            <select
              name="precedenceTasks"
              multiple
              value={taskData.precedenceTasks}
              onChange={handleDependencyChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
              size={Math.min(tasks.length,3)}
            >
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <option key={task._id} value={task._id}>
                    {task.name}
                  </option>
                ))
              ) : (
                <option disabled>No tasks available</option>
              )}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>

          {/* Project ID */}
          <div>
            <label className="block text-gray-300 mb-1">Project ID</label>
            <div className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
              {projectId}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
