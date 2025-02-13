import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dropdownButton from '../assets/dropdown-button.png';

const DropdownMenu: React.FC = () => {
  // use useState to manage the state of isDropdownOpen
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // create a function to set the dropdown menu to is falsy
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState: boolean) => !prevState);
  };

  return (
    // div
    <div className='dropdown-container text-white fixed top-4 right-4 z-20'>
      <div onClick={toggleDropdown} className='dropdown-button'>
        <h1
          className='ml-3'
          style={{
            fontFamily: '"Faustina", sans-serif',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
          }}
        >
          Menu
        </h1>
        <img src={dropdownButton} alt='Menu Button' className='w-15 h-15' />
      </div>

      {isDropdownOpen && (
        <ul className='dropdown-menu absolute right-0 mt-2 bg-neutral-50 text-[#193B2D] p-4 rounded shadow-lg z-30'>
          <li>
            <Link
              to='/'
              className='hover:text-[#A3CD9A] transition-colors duration-200 ease-in-out'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/Dashboard'
              className='hover:text-[#A3CD9A] transition-colors duration-200 ease-in-out'
            >
              Dashboard
            </Link>
          </li>
          {/* <li>
            <Link to='/Documentation'>Documentation</Link>
          </li>
          <li>
            <Link to='/Logout'>Logout</Link>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
