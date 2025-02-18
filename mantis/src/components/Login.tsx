import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dummy user for demonstration
  const user = {
    email: 'test@example.com',
    password: 'password',
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    // Replace with your actual registration logic or navigation
    alert('Navigate to Registration Page');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter your email and password');
    } else if (email !== user.email || password !== user.password) {
      alert('Invalid email or password');
    } else {
      alert('Login successful');
    }
  };

  return (
    <div className="login-container flex justify-center items-center w-full">
      {/* Glass/blur effect container */}
      <div
        className="
          login-form w-full max-w-sm p-6 
          rounded-xl shadow-2xl 
          bg-[rgba(25,59,45,0.5)] 
          backdrop-blur-md
        "
      >
        <h1
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: '"Faustina", sans-serif' }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 rounded-md focus:outline-none border 
                       focus:ring-2 focus:ring-[#A3CD9A]"
          />
          {/* Password */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 rounded-md focus:outline-none border 
                       focus:ring-2 focus:ring-[#A3CD9A]"
          />
          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-[#fdb53d] hover:text-[#fce3a9]"
            >
              Forgot Password
            </button>
          </div>
          {/* Sign In */}
          <button
            type="submit"
            className="
              login-button w-full py-2 mt-2 rounded-md 
              bg-[#A3CD9A] text-[#193B2D] font-semibold 
              hover:bg-[#fdf6bf] 
              transition-colors duration-200
            "
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Sign In
          </button>
          {/* Register */}
          <button
            type="button"
            onClick={handleRegister}
            className="text-sm text-white mt-2 hover:underline"
          >
            Don&apos;t have an account? <span className="font-bold">Register</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
