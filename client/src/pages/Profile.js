import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Role: {user.role}</div>
      {user.picture && <img src={user.picture} alt="Profile" style={{ width: 100, borderRadius: '50%' }} />}
    </div>
  );
};

export default Profile;
