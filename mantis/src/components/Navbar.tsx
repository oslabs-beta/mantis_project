// src/components/NavBar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mantisLogo from '../assets/wingLogo.png'; // an image of your choice

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex items-center justify-between bg-[#193B2D] p-4 shadow-md">
        {/* Left side - logo and brand name */}
        <Link to="/" className="flex items-center">
          <img src={mantisLogo} alt="Mantis Logo" className="h-8 w-8 mr-2" />
          <span
            className="text-white text-xl font-bold"
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Mantis
          </span>
        </Link>
        {/* Right side - GitHub, Dashboard and Login */}
        <div className="flex space-x-4 items-center">
          <a
            href="https://github.com/oslabs-beta/mantis_project"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow transition-colors duration-150 ease-in-out"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md shadow transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>
      </nav>
      <style>{`
        .orange-border {
          position: relative;
          z-index: 0;
          overflow: visible; /* Allow the glow to extend outside the button */
        }
        .orange-border::after {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: inherit;
          box-shadow: 0 0 8px 2px rgba(255, 165, 0, 0);
          transition: box-shadow 0.3s ease-in-out;
          pointer-events: none;
        }
        .orange-border:hover::after {
          box-shadow: 0 0 8px 2px rgb(0, 229, 255);
        }
      `}</style>
    </>
  );
};

export default NavBar;
