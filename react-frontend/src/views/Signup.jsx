import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import '../index.css';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value // renamed for Laravel
    };

    console.log('Signup payload:', payload);

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
        setErrors({}); // clear errors on success
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          console.log('Validation errors:', response.data.errors);
        }
      });
  };

  return (
    <div className='flex justify-center items-center h-screen px-8'>
      <div className='card'>
        <form onSubmit={onSubmit}>
          <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
          <input
            ref={nameRef}
            placeholder='Full Name'
            className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'
          />
          <input
            ref={emailRef}
            type='email'
            placeholder='Email Address'
            className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'
          />
          <input
            ref={passwordRef}
            type='password'
            placeholder='Password'
            className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'
          />
          <input
            ref={confirmPasswordRef}
            type='password'
            placeholder='Confirm Password'
            className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'
          />
          <button type='submit' className='button w-full'>
            Sign Up
          </button>
          <p className='mt-4'>
            Already have an account? <Link to='/login'> Sign in </Link>
          </p>
        </form>

        {/* Error messages at the bottom of the card */}
        {error && Object.keys(error).length > 0 && (
          <div className='bg-red-100 text-red-700 p-4 rounded mt-4'>
            {Object.keys(error).map((key) => (
              <p key={key}>{error[key][0]}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
