// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import mantisIcon1 from '../assets/6.png';
import mantisIcon2 from '../assets/7.png';
import mantisIcon3 from '../assets/8.png';
import Documentation from './documentation';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-xl">
      {/* NavBar at the top */}


      {/* Hero Section: SEO Description & YouTube Video */}
      <section className="bg-[#A3CD9A] text-white p-8 flex flex-col md:flex-row">
        {/* Left Column - SEO Description */}
        <div className="md:w-1/2 p-4">
          <h2
            className="text-5xl font-bold mb-2"
            style={{ fontFamily: '"Faustina", sans-serif', color: 'Black' }}
          >
            Mantis Microservice Dashboard
          </h2>
          <p className="text-xl font-light text-green-900">
            Discover Mantis, a state-of-the-art browser-based dashboard designed to provide dynamic load balancing, performance monitoring, and real-time observability for your microservices. Ideal for DevOps and engineering teams looking to streamline their operations and get actionable insights.
          </p>
        </div>
        {/* Right Column - YouTube Embed */}
        <div className="md:w-1/2 p-4 flex justify-center items-center">
          <div className="w-full max-w-4xl">
            <iframe
              width="100%"
              height="550"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Mantis Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#1a1a1a] text-white flex flex-col md:flex-row items-center justify-evenly py-12">
        {/* Feature 1 */}
        <div className="max-w-sm mb-6 md:mb-0 text-center">
          <img
            src={mantisIcon1}
            alt="Dynamic Loading"
            className="mx-auto w-40 h-40 mb-4"
          />
          <h3 className="text-2xl font-bold">Dynamic Loading</h3>
          <p className="mt-2 text-base">
            Routes traffic intelligently using real-time Prometheus metrics,
            ensuring efficient microservice distribution and preventing overload.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="max-w-sm mb-6 md:mb-0 text-center">
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
        <div className="max-w-sm text-center">
          <img
            src={mantisIcon3}
            alt="Seamless Observability"
            className="mx-auto w-40 h-40 mb-4"
          />
          <h3 className="text-2xl font-bold">Seamless Observability</h3>
          <p className="mt-2 text-base">
            Gain instant visibility into microservice performance with integrated Prometheus, InfluxDB, and Grafana dashboards for real-time troubleshooting.
          </p>
        </div>
      </section>

      {/* Download & Installation Section */}
      <section className="bg-white text-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Download & Installation</h2>
          <p className="mb-4 text-xl">
            Get started with Mantis quickly and easily. Install our NPM package to integrate it with your microservice ecosystem.
          </p>
          <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
            <code>npm install mantis</code>
          </pre>
          <p className="mt-4">
            For detailed installation instructions and integration guides, check out our{" "}
            <Link to="/documentation" className="text-blue-600 hover:underline">
              Documentation
            </Link>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-gray-200 text-base p-4 flex justify-center">
        <p className="text-center">Copyright © 2025 Mantis Microservice, Inc.</p>
      </footer>
    </div>
  );
};

export default Home;
