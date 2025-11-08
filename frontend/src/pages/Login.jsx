import React, { useState } from 'react';
import { api, setAuthToken } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      // auto close alert after 4 seconds
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 relative">
      {/* Error alert */}
      <ErrorAlert message={error} onClose={() => setError('')} />

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Welcome Back
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
            >
              Register here &gt;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
