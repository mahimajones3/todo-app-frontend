import React, { useState } from 'react';
import api from '../api';

function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const { data } = await api.post(endpoint, { name, email, password });
      localStorage.setItem('token', data.token);
      onAuth();
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default Auth;
