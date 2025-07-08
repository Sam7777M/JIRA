import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicket, addComment } from '../api/ticket';

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    getTicket(id).then(res => setTicket(res.data));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    await addComment(id, { text: comment });
    getTicket(id).then(res => setTicket(res.data));
    setComment('');
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="ticket-container">
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <div>Type: {ticket.type}</div>
      <div>Status: {ticket.status}</div>
      <div>Priority: {ticket.priority}</div>
      <div>Assigned To: {ticket.assignedTo?.name || ticket.assignedTo?.email || 'Unassigned'}</div>
      <h3>Comments</h3>
      <ul>
        {ticket.comments.map((c, i) => (
          <li key={i}>{c.text} - {c.author?.name || c.author?.email}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment" required />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Ticket;
