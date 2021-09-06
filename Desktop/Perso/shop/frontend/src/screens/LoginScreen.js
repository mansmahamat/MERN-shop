import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

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
    dispatch(login(email, password));
  };

  return (
    <div className=" flex mt-32 mb-20 justify-center items-center">
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Login into your account
          </h1>
          {error && (
            <p className="w-80 text-center text-sm mb-8 font-semibold text-red-700 tracking-wide cursor-pointer">
              Invalid email or password
            </p>
          )}
          {loading && <Loader />}
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Login into your account to enjoy whith our plants.
          </p>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Email Addres"
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
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-green-400 hover:bg-green-600 rounded-2xl"
            >
              Login
            </button>
            <p className="mt-4 text-sm">
              Don't Have An Account ?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="underline ml-2 cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
