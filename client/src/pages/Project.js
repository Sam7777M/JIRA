import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, addMember } from '../api/project';
import { getTicketsByProject, createTicket } from '../api/ticket';
import { AuthContext } from '../context/AuthContext';

const Project = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [ticketForm, setTicketForm] = useState({ title: '', type: 'Task', priority: 'Medium' });

  useEffect(() => {
    getProject(id).then(res => setProject(res.data));
    getTicketsByProject(id).then(res => setTickets(res.data));
  }, [id]);

  const handleAddMember = async () => {
    // You may want to implement a user search by email in production
    // Here, assume backend expects userId
    // setMemberEmail('');
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    await createTicket({ ...ticketForm, projectId: id });
    getTicketsByProject(id).then(res => setTickets(res.data));
    setTicketForm({ title: '', type: 'Task', priority: 'Medium' });
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-container">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <h3>Members</h3>
      <ul>
        {project.members.map(m => <li key={m._id}>{m.name || m.email}</li>)}
      </ul>
      {/* Add member UI can go here */}
      <h3>Tickets</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>{ticket.title} ({ticket.type})</li>
        ))}
      </ul>
      <form onSubmit={handleCreateTicket}>
        <input placeholder="Title" value={ticketForm.title} onChange={e => setTicketForm({ ...ticketForm, title: e.target.value })} required />
        <select value={ticketForm.type} onChange={e => setTicketForm({ ...ticketForm, type: e.target.value })}>
          <option value="Bug">Bug</option>
          <option value="Task">Task</option>
          <option value="Story">Story</option>
          <option value="Epic">Epic</option>
        </select>
        <select value={ticketForm.priority} onChange={e => setTicketForm({ ...ticketForm, priority: e.target.value })}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default Project;
