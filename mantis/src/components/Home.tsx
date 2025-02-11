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
    <div className='home-container p-4 relative h-full w-full flex items-center justify-center'>
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
      <div className='absolute z-10 items-center text-center w-full'>
        <h1
          className='font-bold tracking-[2.3rem] text-emerald-950'
          style={{
            fontFamily: '"Faustina", sans-serif',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
            fontSize: '5vw',
            transform: 'translateX(20px)',
          }}
        >
          MANTIS
        </h1>
        <p
          className='text-[#FDF7BF]'
          style={{
            fontFamily: '"IBM Plex Serif", sans-serif',
            position: 'absolute',
            top: 'calc(100% + 37vh)',
            fontSize: '1vw',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Fast and precise Microservice metrics tracker
        </p>
        <iframe
          src='http://localhost:3000/d-solo/becs3ua4k0xz4b/new-dashboard?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo'
          width='450'
          height='200'
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
