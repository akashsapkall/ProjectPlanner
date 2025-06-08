import React, { useRef, useEffect, useState } from "react";
import api from "../utils/api"; // Adjust this import based on your project structure

const GanttChart = ({ project, onClose }) => {
  const scrollContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/tasks/${project._id}/get-tasks`);
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

    if (project._id) fetchTasks();
  }, [project._id]);

  // Scroll sync
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const timeline = timelineRef.current;
    if (!scrollContainer || !timeline) return;

    const handleScroll = () => {
      timeline.scrollLeft = scrollContainer.scrollLeft;
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Get max end day for timeline scale
  const maxEndDay = Math.max(...tasks.map((task) => task.endDay || 0), 0);

  return (
    <div className="bg-gray-800 rounded-lg max-h-[90%] overflow-x-hidden max-w-5xl border border-gray-700 m-1">
      <div className="sm:px-2 py-6 lg:px-6 mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          {project.name} - Gantt Chart
        </h2>

        <div className="h-2 mb-3 rounded-full overflow-hidden bg-gray-700">
          <div
            ref={scrollContainerRef}
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: "0%" }}
          />
        </div>

        <div className="overflow-hidden">
          <div
            ref={timelineRef}
            className="overflow-x-auto pb-4 custom-scrollbar"
          >
            <div className="min-w-max">
              {/* Timeline Header */}
              <div className="flex mb-3">
                <div className="w-48"></div>
                {Array.from({ length: maxEndDay + 1 }).map((_, day) => (
                  <div
                    key={day}
                    className="w-16 text-center text-sm text-gray-400"
                  >
                    Day {day}
                  </div>
                ))}
              </div>

              {/* Tasks */}
              {tasks.map((task) => (
                <div key={task._id} className="flex items-center mb-4">
                  <div className="w-48 text-gray-300 font-medium flex items-center text-sm">
                    {task.name}
                    {task.precedenceTasks.length > 0 && (
                      <svg
                        className="w-4 h-4 text-gray-400 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow relative h-10 bg-gray-700 rounded-lg overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg shadow-md"
                      style={{
                        left: `${(task.startDay / maxEndDay) * 100}%`,
                        width: `${
                          ((task.endDay - task.startDay) / maxEndDay) * 100
                        }%`,
                        minWidth: "40px",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {task.startDay}-{task.endDay} ({task.duration}d)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Details Table */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-white mb-3">Task Details</h3>
          <div className="bg-gray-700 rounded-lg p-4 overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4 text-left">Task</th>
                  <th className="py-2 px-4 text-left">Duration</th>
                  <th className="py-2 px-4 text-left">Start Day</th>
                  <th className="py-2 px-4 text-left">End Day</th>
                  <th className="py-2 px-4 text-left">Dependencies</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-gray-600 last:border-0 hover:bg-gray-600 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium">{task.name}</td>
                    <td className="py-3 px-4">{task.duration} days</td>
                    <td className="py-3 px-4">Day {task.startDay}</td>
                    <td className="py-3 px-4">Day {task.endDay}</td>
                    <td className="py-3 px-4">
                      {task.precedenceTasks.length > 0
                        ? task.precedenceTasks
                            .map((depId) => {
                              const dep = tasks.find((t) => t._id === depId);
                              return dep?.name || "Unknown";
                            })
                            .join(", ")
                        : "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default GanttChart;
