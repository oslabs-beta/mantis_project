import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Documentation from './Documentation';
import DropdownMenu from './DropdownMenu';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/logo.png';

const Home: React.FC = () => {
  return (
    <div
      className='home-container p-4 relative h-full w-full flex items-center justify-center'
      style={{
        fontFamily: '"IBM Plex Serif", sans-serif',
      }}
    >
      {/* Background image */}
      <div
        className='absolute inset-0 bg-center bg-no-repeat w-full h-full z-0'
        style={{
          backgroundImage: `url(${Logo})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
      <div className='absolute z-10 items-center text-center w-full top-80'>
        <h1
          className='font-bold tracking-[2.3rem] text-emerald-950'
          style={{
            fontFamily: '"Faustina", sans-serif',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 1.5)',
            fontSize: '5vw',
            transform: 'translateX(20px)',
          }}
        >
          MANTIS
        </h1>
        <p
          className='font-bold tracking-wide text-emerald-950'
          style={{
            fontFamily: '"Faustina", sans-serif',
            textShadow: '2px 2px 5px rgba(255, 255, 255, 1.5)',
            fontSize: '1.2vw',
          }}
        >
          Fast and precise microservice metrics tracker
        </p>
        <div className='relative top-7'>
          <Login />
        </div>

        <p
          className='text-[#FDF7BF] tracking-[0.2rem]'
          style={{
            fontFamily: '"Faustina", sans-serif',
            position: 'absolute',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
            top: 'calc(100% + 8vh)',
            fontSize: '1.2vw',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Spread your wings and try Mantis today
        </p>
      </div>
    </div>
  );
};

export default Home;

//IBM Plex Serif
