import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional icon library

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        MERN Agent System
      </Link>
  
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4">
        {isLoggedIn && (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/agents"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Agents
            </Link>
            <Link
              to="/contact/upload"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Upload CSV
            </Link>
          </>
        )}
      </nav>
  
      {/* Auth button */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
  
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  
    {/* Mobile Menu Dropdown */}
    {menuOpen && (
      <div className="md:hidden bg-white border-t mt-2 px-4 pb-4 space-y-2">
        {isLoggedIn && (
          <>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/agents"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              Agents
            </Link>
            <Link
              to="/contact/upload"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              Upload CSV
            </Link>
          </>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    )}
  </header>
  
  );
};

export default Header;
