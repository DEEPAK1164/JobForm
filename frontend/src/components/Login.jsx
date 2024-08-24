import React, { useRef, useState } from 'react';
import Header from './Header';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Form validation or other logic can be added here
    setErrorMessage(null);
  };

  return (
    <div>
      <Header />
  
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-3/12 absolute top-0 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
      >
        <h1 className='font-bold text-3xl p-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700 rounded-lg'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700 rounded-lg'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700 rounded-lg'
        />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? 'New to JobForm? Sign Up Now' : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
