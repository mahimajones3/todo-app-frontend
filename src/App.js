import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <nav>
          {isAuthenticated ? (
            <>
              <button onClick={() => handleLogout()}>Logout</button>
              <a href="/todos">Todos</a>
              <a href="/profile">Profile</a>
            </>
          ) : (
            <a href="/auth">Login / Signup</a>
          )}
        </nav>
        <Routes>
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth onAuth={handleAuth} /> : <Navigate to="/todos" />}
          />
          <Route
            path="/todos"
            element={isAuthenticated ? <TodoList /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/todos" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
