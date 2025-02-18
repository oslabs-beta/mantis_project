// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mantisLogo from '../assets/wingLogo.png'; // an image of your choice

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isBursting, setIsBursting] = useState(false);

  const handleDashboardClick = () => {
    // Trigger the burst effect
    setIsBursting(true);
    // Let the burst run for 400ms then navigate
    setTimeout(() => {
      setIsBursting(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <>
      <style>
        {`
          @keyframes burst {
            0% {
              box-shadow: 0 0 0px rgba(0,255,0,0);
            }
            50% {
              box-shadow: 0 0 8px 1px rgba(0,255,0,1);
            }
            100% {
              box-shadow: 0 0 0px rgba(0,255,0,0);
            }
          }
        `}
      </style>
      <nav className="flex items-center justify-between bg-[#193B2D] p-4 shadow-md">
        {/* Left side - logo and brand name */}
        <Link to="/" className="flex items-center">
          <img
            src={mantisLogo}
            alt="Mantis Logo"
            className="h-12 w-12 mr-2"
          />
          <span
            className="text-white text-2xl font-bold"
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Mantis
          </span>
        </Link>
        {/* Right side - GitHub, Dashboard, Login, Documentation */}
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
            onClick={handleDashboardClick}
            className="relative overflow-hidden group px-4 py-2 bg-green-500 hover:bg-indigo-500 text-white font-semibold rounded-md shadow transition-colors duration-150 ease-in-out"
            style={isBursting ? { animation: 'burst 0.4s forwards' } : {}}
          >
            Dashboard
            <span className="absolute -left-[100%] top-0 w-[200%] h-full transform rotate-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-500 ease-out pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0,20 C20,0 80,0 100,20 C80,40 20,40 0,20 Z"
                  fill="rgba(0,255,0,0.7)"
                />
              </svg>
            </span>
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
