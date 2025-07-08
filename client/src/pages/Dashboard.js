import React, { useEffect, useState } from 'react';
import { getProjects } from '../api/project';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Projects</h2>
      <button onClick={() => navigate('/projects/new')}>Create Project</button>
      <ul>
        {projects.map(project => (
          <li key={project._id} onClick={() => navigate(`/projects/${project._id}`)}>
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
