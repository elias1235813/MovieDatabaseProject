import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        onLogin();
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Käyttäjätunnus:</label>
          <input
            className="form-control"
            placeholder="Käyttäjätunnus"
            aria-label="Käyttäjätunnus"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salasana:</label>
          <input
            className="form-control"
            placeholder="Salasana"
            aria-label="Salasana"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-outline-success" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
