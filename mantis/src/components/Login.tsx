import e from 'express';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  const handleRegister = () => {};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== user.email || password !== user.password) {
      alert('Invalid email or password');
    } else if (!email || !password) {
      alert('Please enter your email and password');
    } else {
      alert('Login successful');
    }
  };

  return (
    <div className='login-container flex justify-center items-center h-40'>
      <div className='login-form w-96 items-center justify-center p-6 border-2 rounded-xl shadow-xl'>
        <h1 className='text-lg font-bold text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            placeholder='email'
            value={email}
            onChange={handleEmailChange}
            className='input'
          />
          <input
            type='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={handlePasswordChange}
            className='input'
          />
          <button type='submit' className='login-button'>
            Login
          </button>
          <button
            type='button'
            onClick={handleRegister}
            className='register-button'
          >
            Register
          </button>
        </form>
      </div>
      <button className='forgot-password-button text hover:underline hover:text-[#fdb53d] transition-colors duration-200 ease-in-out'>
        Forgot Password
      </button>
    </div>
  );
};

export default Login;
