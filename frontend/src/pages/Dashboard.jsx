// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import GanttChart from '../components/GanttChart';
import api from '../utils/api';

const Dashboard = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
          // console.log("Aakdnshgdfhsdg____01");
        const response = await api.get('/projects/get-projects');
          // console.log("Aakdnshgdfhsdg____02");
        if (response.status === 200 || response.status === 201) {
          setProjects(response.data);
          // console.log(typeof projects);
        } else {
          setError(response.data?.message || 'Unable to load project data. Please try again later.');
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Something went wrong while fetching projects.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []); // only re-run if userData changes

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  // const handleCreateProject = (projectName) => {
  //   const newProject = {
  //     id: `${projects.length + 1}`,
  //     name: projectName,
  //     duration: 0,
  //     tasks: [],
  //     startDate: new Date().toISOString().split('T')[0],
  //     endDate: new Date().toISOString().split('T')[0]
  //   };
  //   setProjects([...projects, newProject]);
  //   setShowProjectForm(false);
  // };
  
  // const handleAddTask = (projectId, newTask) => {
  //   setProjects(prevProjects => 
  //     prevProjects.map(project => 
  //       project.id === projectId 
  //         ? { 
  //             ...project, 
  //             tasks: [...project.tasks, newTask],
  //             tasksCount: project.tasks.length + 1
  //           } 
  //         : project
  //     )
  //   );
  // };
  
  const handleViewPlan = (projectId) => {
    const project = projects.find(p => p._id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };
  
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Projects</h1>
        <button
          onClick={() => setShowProjectForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create New Project
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto bg-indigo-900 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Projects Yet</h2>
            <p className="text-gray-400 mb-6">Create your first project to start planning tasks and dependencies</p>
            <button
              onClick={() => setShowProjectForm(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create Your First Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              // onAddTask={handleAddTask}
              onViewPlan={handleViewPlan} 
            />
          ))}
        </div>
      )}
      
      {showProjectForm && (
        <ProjectForm 
          onCreate={() => setShowProjectForm(false)} 
          onCancel={() => setShowProjectForm(false)} 
        />
      )}
      
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <GanttChart 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;