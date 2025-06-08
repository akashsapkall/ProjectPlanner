// src/components/ProjectCard.jsx
import React from "react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
const ProjectCard = ({ project, onViewPlan }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const navigate=useNavigate();
  const handleAddTask = () => {
    setShowTaskForm(true);
  };

  const handleTaskSave = (newTask) => {
    navigate(0);
    setShowTaskForm(false);
  };

  const handleTaskCancel = () => {
    setShowTaskForm(false);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <span className="bg-indigo-900 text-indigo-200 text-xs font-semibold px-2 py-1 rounded">
              {project.totalDuration} days
            </span>
          </div>

          <div className="mt-4 text-gray-400">
            <div className="flex items-center mb-1">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {new Date(project.startdate).toDateString()} to{" "}
                {new Date(project.enddate).toDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{project.totalTasks} tasks</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleAddTask}
              className="flex-1 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add Task
            </button>
            <button
              onClick={() => onViewPlan(project._id)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
            >
              {/* <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg> */}
              View Plan
            </button>
          </div>
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          projectId={project._id}
          onSave={handleTaskSave}
          onCancel={handleTaskCancel}
        />
      )}
    </>
  );
};

export default ProjectCard;
