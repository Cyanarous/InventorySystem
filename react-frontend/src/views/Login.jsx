import {Link} from 'react-router-dom';
import '../index.css';
export default function Login() {

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='flex justify-center items-center h-screen px-8'>
      <div className='card'>
        <form onSubmit={onSubmit}>
          <h1 className='text-2xl font-bold mb-4'>Login into your account</h1>
          <input type="email" placeholder='example@gmail.com' className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <input type="password" placeholder='Password' className='text-lg w-full border-2 border-solid border-slate-400 rounded-md px-2 py-2 mb-2'/>
          <button type="submit">Login</button>
          <p> Not Registered? <Link to='/signup'> Create an Account </Link></p>
        </form>
      </div>
    </div>
  );
}