import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/gameboard", label: "Game" },
    !user && { to: "/login", label: "Login" },
    !user && { to: "/registration", label: "Register" },
  ].filter(Boolean);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition">
          ♟ Othello
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.to ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <span className="text-sm text-gray-300">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-gray-800 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.to ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <span className="block px-3 py-2 text-gray-300">Welcome, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 w-full rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
