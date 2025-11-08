import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Left side links */}
        <div className="flex space-x-4">
          <Link to="/" className="px-3 py-2 rounded hover:bg-blue-700 transition">
            Feed
          </Link>
          <Link to="/search" className="px-3 py-2 rounded hover:bg-blue-700 transition">
            Search
          </Link>
        </div>

        {/* Right side user/login */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <span>{user.username}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded hover:bg-blue-700 transition">
                Login
              </Link>
              <Link to="/register" className="px-3 py-2 rounded hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
