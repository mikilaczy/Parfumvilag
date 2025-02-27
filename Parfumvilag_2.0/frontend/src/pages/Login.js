import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/profil';
    } catch (err) {
      setError(err.response?.data?.error || 'Bejelentkezés sikertelen.');
    }
  };

  return (
    <div className="container my-5 auth-container">
      <h1 className="text-center mb-4 auth-title">Bejelentkezés</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mx-auto auth-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email cím</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Jelszó</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Bejelentkezés</button>
      </form>
    </div>
  );
};

export default Login;