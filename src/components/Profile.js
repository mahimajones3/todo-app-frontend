import React, { useState, useEffect } from 'react';
import api from '../api';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await api.get('/profile');
    setName(data.name);
    setEmail(data.email);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await api.put('/profile', { name, email, password });
    alert('Profile updated');
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
