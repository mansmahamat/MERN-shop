import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterScreen({ location, history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      toast.success('Login successfully 🚀', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 6) {
      setMessage('Passwords need to match and have at least 6 characters');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className=" flex mt-32 mb-20 justify-center items-center">
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Sign up
          </h1>
          {error && (
            <p className="w-80 text-center text-sm mb-8 font-semibold text-red-700 tracking-wide cursor-pointer">
              Invalid email or password
            </p>
          )}
          {message && (
            <p className="w-80 text-center text-sm mb-8 font-semibold text-red-700 tracking-wide cursor-pointer">
              {message}
            </p>
          )}
          {loading && <Loader />}
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Create an account to enjoy whith our plants.
          </p>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-green-400 hover:bg-green-600 rounded-2xl"
            >
              Register
            </button>
            <p className="mt-4 text-sm">
              Already Have An Account?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className="underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
