import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

const ProjectForm = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    startdate: '',
    enddate: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const { projectName, startdate, enddate } = formData;

    if (!projectName.trim()) return 'Project name is required.';
    if (!startdate) return 'Start date is required.';
    if (!enddate) return 'End date is required.';
    if (new Date(enddate) < new Date(startdate)) return 'End date cannot be before start date.';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/projects/create-project', {
        name: formData.projectName,
        startdate: formData.startdate,
        enddate: formData.enddate
      });

      if (response.status === 201 || response.status === 200) {
        onCreate();
        navigate(0);
      } else {
        setError(response.data?.message || 'Project creation failed. Please try again.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong while creating the project.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Project</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project name"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startdate" className="block text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              id="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="enddate" className="block text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              id="enddate"
              value={formData.enddate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
