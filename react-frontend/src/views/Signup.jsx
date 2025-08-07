import {Link} from 'react-router-dom';
import {useRef, useState} from 'react';
import '../index.css';
import axiosClient from '../axios-client';
import {useStateContext} from '../context/ContextProvider';

export default function Signup() {
  
  const nameRef = useRef();
  const emailRef = useRef();  
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setErrors] = useState({});

  const {setUser, setToken} = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,  
      password: passwordRef.current.value,
      confirm_password: confirmPasswordRef.current.value //snake_case for laravel compatibility
    } 

    axiosClient.post('/signup', payload)
      .then((data) => {
        setToken(data.token);
        setUser(data.user);
     }).catch((error) => {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } 
     })
  }

  return (
    <div className='flex justify-center items-center h-screen px-8'>
      <div className='card'>
        <form onSubmit={onSubmit}>
          <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
          <input ref={nameRef}placeholder='Full Name' className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <input ref={emailRef}type="email" placeholder='Email Address' className=' text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <input ref={passwordRef}type="password" placeholder='Password' className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <input ref={confirmPasswordRef}type="password" placeholder='Confirm Password' className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <button type="submit" className='button w-full'>Sign Up</button>
          <p> Already have an account? <Link to='/login'> Sign in </Link></p>
        </form>
      </div>
    </div>
  );
}   