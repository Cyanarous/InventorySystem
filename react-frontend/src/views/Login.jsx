import { Link } from 'react-router-dom';
import '../index.css';
import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors({}); // clear previous errors

    console.log('Login payload:', payload);

    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
        setErrors({}); // clear errors on success
        console.log('Login successful:', data);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else if (response.data.message) {
            setErrors({ general: [response.data.message] });
          } else {
            setErrors({ general: ['An error occurred. Please try again.'] });
          }
          console.log('Validation errors or message:', response.data);
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen px-8">
      <div className="card">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4">Login into your account</h1>
          <input
            ref={emailRef}
            type="email"
            placeholder="example@gmail.com"
            className="text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2"
          />
          <button type="submit" className="button w-full">
            Login
          </button>
          <p>
            Not Registered? <Link to="/signup"> Create an Account </Link>
          </p>
        </form>

        {/* Error messages at the bottom of the card */}
        {error && Object.keys(error).length > 0 && (
          <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
            {Object.keys(error).map((key) => (
              <p key={key}>
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
