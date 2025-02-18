// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';          // New modern homepage
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage'; // Old homepage → now the login screen
import Documentation from './components/Documentation';


function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      {/* Top navigation */}
      <NavBar />

      {/* Main content area */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
