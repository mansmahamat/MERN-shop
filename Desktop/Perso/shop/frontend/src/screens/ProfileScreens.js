import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';

function ProfileScreens({ location, history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 6) {
      setMessage('Passwords need to match and have at least 6 characters');
    } else {
      //
    }
  };

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Update your profile
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
            <div className="text-center mt-12">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white bg-green-400 hover:bg-green-600 rounded-2xl"
              >
                Update
              </button>
            </div>
          </form>
          {cartItems.length === 0 ? (
            'empty'
          ) : (
            <>
              <div className=" text-center mt-20 border-b pb-8">
                <h1 className="font-semibold text-2xl">Your Cart</h1>
              </div>
              <table className="w-full text-sm lg:text-base" cellspacing="0">
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="hidden md:table-cell"></th>
                    <th className="text-left">Product</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline">Quantity</span>
                    </th>
                    <th className="hidden text-right md:table-cell">
                      Unit price
                    </th>
                    <th className="text-right">Total price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="hidden pb-4 md:table-cell">
                        <Link to={`/plant/${item.product}`}>
                          <img
                            src={item.image}
                            className="w-28 rounded"
                            alt={item.name}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/plant/${item.product}`}>
                          <p className="underline mb-2 ">{item.name}</p>
                        </Link>
                      </td>
                      <td className="justify-center md:justify-end md:flex mt-12">
                        <div className="w-20 h-10">
                          <div className="relative flex flex-row w-full h-8">
                            <input
                              readOnly
                              type="number"
                              value={item.qty}
                              className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="hidden text-right md:table-cell">
                        <span className="text-sm lg:text-base font-medium">
                          {item.price} €
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm lg:text-base font-medium">
                          {(item.price * item.qty).toFixed(2)} €
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <hr className="pb-6 mt-6" />
        </div>
      </div>
    </div>
  );
}

export default ProfileScreens;
