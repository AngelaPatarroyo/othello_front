import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: "/", label: "Home" },
    user ? { to: "/leaderboard", label: "Leaderboard" } : null,
    user ? { to: "/gameboard", label: "Game" } : null,
    user?.role === "Admin" ? { to: "/admin", label: "Admin Panel" } : null,
    !user ? { to: "/login", label: "Login" } : null,
    !user ? { to: "/registration", label: "Register" } : null,
  ].filter(Boolean);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition">
          ♟ Othello
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.to ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <span className="text-sm text-gray-300">
                Welcome, {user.userName || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
