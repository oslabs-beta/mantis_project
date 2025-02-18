import React from 'react';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2">Mantis Documentation</h1>
        <p className="text-xl">
          Comprehensive guide to using and contributing to Mantis.
        </p>
        <nav className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </nav>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Table of Contents</h2>
          <ol className="list-decimal list-inside">
            <li>
              <a href="#introduction" className="text-blue-600 hover:underline">
                Introduction
              </a>
            </li>
            <li>
              <a href="#installation" className="text-blue-600 hover:underline">
                Installation
              </a>
            </li>
            <li>
              <a href="#usage" className="text-blue-600 hover:underline">
                Usage
              </a>
            </li>
            <li>
              <a href="#contributing" className="text-blue-600 hover:underline">
                Contributing
              </a>
            </li>
            <li>
              <a href="#license" className="text-blue-600 hover:underline">
                License
              </a>
            </li>
          </ol>
        </section>
        <section id="introduction" className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Introduction</h2>
          <p className="text-xl mb-4">
            Mantis is a browser-based microservice dashboard designed to provide dynamic load balancing, performance monitoring, and observability for your applications. This guide offers detailed insights and tutorials on how to get started with Mantis.
          </p>
        </section>
        <section id="installation" className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Installation</h2>
          <p className="text-xl mb-4">
            To install Mantis, use npm:
          </p>
          <pre className="bg-gray-200 p-4 rounded">
            <code>npm install mantis</code>
          </pre>
        </section>
        <section id="usage" className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Usage</h2>
          <p className="text-xl mb-4">
            After installation, integrate Mantis into your microservices environment. To launch the dashboard, run:
          </p>
          <pre className="bg-gray-200 p-4 rounded">
            <code>npm run start:dashboard</code>
          </pre>
          <p className="text-xl mt-4">
            The dashboard provides various panels to monitor system performance and dynamic load distribution.
          </p>
        </section>
        <section id="contributing" className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Contributing</h2>
          <p className="text-xl mb-4">
            We welcome community contributions. For more information, please refer to our{' '}
            <a
              href="https://github.com/oslabs-beta/mantis_project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub repository
            </a>.
          </p>
        </section>
        <section id="license" className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">License</h2>
          <p className="text-xl">
            Mantis is released under the MIT License. Please see the LICENSE file for details.
          </p>
        </section>
      </main>
      <footer className="mt-8 text-center text-lg">
        <p>© 2025 Mantis, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Documentation;
