import React from 'react';
import { Link } from 'react-router-dom';
import mantisIcon1 from '../assets/6.png';
import mantisIcon2 from '../assets/7.png';
import mantisIcon3 from '../assets/8.png';
import ecosystemImage from '../assets/Ecosystem.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-xl">
      {/* Hero Section */}
      <section
        className="
          relative 
          bg-gradient-to-r 
          from-[#A3CD9A] 
          via-[#96bb8f] 
          to-[#84ae7c]
          text-white 
          px-8 
          py-12 
          flex 
          flex-col 
          md:flex-row
          overflow-hidden
        "
      >
        {/* Subtle Wave Pattern (Background) */}
        <div
          className="
            absolute 
            inset-0
            z-0
            pointer-events-none
            opacity-20
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg%20width%3D'120'%20height%3D'60'%20viewBox%3D'0%200%20120%2060'%20fill%3D'none'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M0%2030%20C30%200%2090%2060%20120%2030'%20stroke%3D'%23ffffff'%20stroke-opacity%3D'0.3'%20stroke-width%3D'4'%20fill%3D'none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 100px',
          }}
        />

        {/* Left Column - SEO Description */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center z-10">
          <h2
            className="text-5xl font-bold mb-4 text-black"
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Mantis Microservice Dashboard
          </h2>
          <p className="text-xl font-light text-gray-900 bg-white/40 backdrop-blur-sm p-4 rounded-md">
            Discover Mantis, a state-of-the-art browser-based dashboard designed
            to provide dynamic load balancing, performance monitoring, and real-time
            observability for your microservices...
          </p>
        </div>

        {/* Right Column - YouTube Embed */}
        <div className="md:w-1/2 p-4 flex justify-center items-center z-10">
          <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Mantis Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Wave Divider from Hero to Features */}
      <div className="relative w-full h-20 -mt-1">
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-[#1a1a1a]"
          fill="currentColor"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L30,74.7C60,85,120,107,180,138.7C240,171,300,213,360,197.3C420,181,480,107,540,101.3C600,96,660,160,720,186.7C780,213,840,203,900,192C960,181,1020,171,1080,154.7C1140,139,1200,117,1260,112C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>

      {/* Features Section */}
      <section className="bg-[#1a1a1a] text-white flex flex-col md:flex-row items-center justify-evenly py-12">
        {/* Feature 1 */}
        <div
          className="
            max-w-sm 
            mb-8 
            md:mb-0 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        >
          <img
            src={mantisIcon1}
            alt="Dynamic Loading"
            className="mx-auto w-40 h-40 mb-4"
          />
          <h3 className="text-2xl font-bold">Dynamic Loading</h3>
          <p className="mt-2 text-base">
          Routes traffic intelligently using real-time Prometheus metrics, ensuring efficient microservice distribution and preventing overload.          </p>
        </div>
        {/* Feature 2 */}
        <div
          className="
            max-w-sm 
            mb-8 
            md:mb-0 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        >
          <img
            src={mantisIcon2}
            alt="Performance Monitoring"
            className="mx-auto w-40 h-40 mb-4"
          />
          <h3 className="text-2xl font-bold">Performance Monitoring</h3>
          <p className="mt-2 text-base">
          Tracks resource usage trends to help engineers manually optimize scaling decisions, improving efficiency and reducing costs.
          </p>
        </div>
        {/* Feature 3 */}
        <div
          className="
            max-w-sm 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        >
          <img
            src={mantisIcon3}
            alt="Seamless Observability"
            className="mx-auto w-40 h-40 mb-4"
          />
          <h3 className="text-2xl font-bold">Seamless Observability</h3>
          <p className="mt-2 text-base">
          Engineers gain instant visibility into microservice performance with Prometheus, Grafana dashboards, and real-time WebSocket updates for better troubleshooting.
          </p>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="bg-white text-gray-800 p-8 flex items-center justify-center">
        <img
          src={ecosystemImage}
          alt="Mantis Ecosystem"
          className="w-full max-w-4xl h-auto mx-auto rounded-lg shadow-xl"
        />
      </section>

      {/* Download & Installation Section */}
      <section className="bg-white text-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Download & Installation</h2>
          <p className="mb-4 text-xl">
            Get started with Mantis quickly and easily. Install our NPM package...
          </p>
          <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
            <code>npm install mantis</code>
          </pre>
          <p className="mt-4">
            For detailed instructions, check out our{' '}
            <Link to="/documentation" className="text-blue-600 hover:underline">
              Documentation
            </Link>.
          </p>
        </div>
      </section>

      {/* Wave Divider from White to Dark Footer */}
      <div className="relative w-full h-32 -mt-1">
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-white"
          fill="currentColor"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L30,186.7C60,213,120,267,180,282.7C240,299,300,277,360,256C420,235,480,213,540,186.7C600,160,660,128,720,128C780,128,840,160,900,160C960,160,1020,128,1080,106.7C1140,85,1200,75,1260,80C1320,85,1380,107,1410,117.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-[#333333] text-gray-200 text-base p-6 flex justify-center">
        <p className="text-center">
          Copyright © 2025 Mantis Microservice, Inc.
        </p>
      </footer>
    </div>
  );
};

export default Home;
