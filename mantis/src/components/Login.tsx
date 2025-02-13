import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFilled, setIsFilled] = useState(false);

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

  const checkFields = (email: string, password: string) => {
    if (email || password) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  return (
    <div className='login-container flex justify-center items-center h-auto'>
      <div
        className={`login-form w-96 p-6 border-1 rounded-xl shadow-xl transition-all duration-300 ease-in-out ${
          isFilled || email || password
            ? 'bg-[rgba(25,59,45,0.9)]'
            : 'bg-[rgba(25,59,45,0.8)]'
        } hover:bg-[rgba(25,59,45,0.9)]`}
      >
        <h1
          className='text-xl font-bold text-white mb-2'
          style={{
            fontFamily: '"Faustina", sans-serif',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
          }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <h2 className='text-sm text-white text-left'>Email Address</h2>
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            className='input bg-white rounded border-1 h-8 w-full p-1'
          />
          <h3 className='text-sm text-white mt-2 text-left'>Password</h3>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            className='input bg-white rounded border-1 h-8 w-full p-1'
          />
          <div className='text-right text-sm'>
            <button className='forgot-password-button text-white hover:font-bold hover:text-[#fdb53d] transition-colors duration-200 ease-in-out'>
              Forgot Password
            </button>
          </div>
          <div className='flex flex-row justify-center gap-2 mt-3'>
            <button
              type='submit'
              className='login-button w-full h-8 rounded-md bg-[#A3CD9A] hover:bg-[#FDF6BF] transition-colors duration-200 ease-in-out'
              style={{
                fontFamily: '"Faustina", sans-serif',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
              }}
            >
              Sign In
            </button>
          </div>
          {/* <a href='/register' className=''> */}
          <button
            type='button'
            onClick={handleRegister}
            className='register-button text-white text hover:font-bold hover:text-[#fdb53d] transition-colors duration-200 ease-in-out'
          >
            Don't have an account? Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
