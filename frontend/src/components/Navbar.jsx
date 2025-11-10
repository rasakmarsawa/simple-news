import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Feed', path: '/' },
    { name: 'Search', path: '/search' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Left: username + links on desktop, username on mobile */}
        <div className="flex items-center">
          {user && (
            <span className="font-medium text-white mr-4">
              {user.username}
            </span>
          )}

          {/* Desktop links */}
          <div className="hidden md:flex h-16 items-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded transition h-full flex items-center ${
                  isActive(link.path) ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: logout on desktop, burger on mobile */}
        <div className="flex items-center">
          {/* Desktop logout */}
          {user && (
            <button
              onClick={onLogout}
              className="hidden md:block px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition h-10"
            >
              Logout
            </button>
          )}

          {/* Mobile burger */}
          {user && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-2 p-2 rounded hover:bg-blue-700 transition focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 w-full flex flex-col space-y-2 px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded transition w-full text-center ${
                isActive(link.path) ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-700'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-800 w-full text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
