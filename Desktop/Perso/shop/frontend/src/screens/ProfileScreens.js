import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders, orderMyList } from '../actions/orderActions';
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

  const orderMyList = useSelector((state) => state.orderMyList);
  const { orders, error: errorOrders, loading: loadingOrders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const count = 10;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords need to match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
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
            {success && (
              <p className="w-80 text-center text-sm mb-8 font-semibold text-green-700 tracking-wide cursor-pointer">
                Profile updated
              </p>
            )}
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

          <hr className="pb-6 mt-6" />
          {!orders ? (
            'empty'
          ) : loadingOrders ? (
            <Loader /> ? (
              errorOrders
            ) : (
              <p>Error</p>
            )
          ) : (
            <>
              <div className=" text-center mt-20 border-b pb-8">
                <h1 className="font-semibold text-2xl">Your Orders</h1>
              </div>
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">ID</th>
                    <th class="py-3 px-6 text-left">Date</th>
                    <th class="py-3 px-6 text-center">Total</th>
                    <th class="py-3 px-6 text-center">Payment status</th>
                    <th class="py-3 px-6 text-center">Details</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                  {orders.map((item, index) => (
                    <tr
                      key={index}
                      class="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="flex items-center">
                          <span class="font-medium">
                            {' '}
                            {item._id.slice(0, count) +
                              (item._id > count ? '...' : '')}
                          </span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-bold">
                            {moment(item.createddAt).format('MM/D/YYYY')}
                          </span>
                        </div>
                      </td>
                      <td class="py-3 font-bold px-6 text-center">
                        <span>{item.totalPrice} €</span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        {item.isPaid ? (
                          <span class="bg-green-200 text-green-800 font-black py-1 px-3 rounded-full ">
                            Paid
                          </span>
                        ) : (
                          <span class="bg-red-200 text-red-600 font-black py-1 px-3 rounded-full ">
                            Not Paid
                          </span>
                        )}
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                          <Link to={`/order/${item._id}`}>
                            <div class="w-4 mr-2 transform hover:text-green-500 hover:scale-110"></div>
                            <div class="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                            <div class="w-4 mr-2 transform hover:text-green-500 hover:scale-110"></div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <table className="w-full text-sm lg:text-base" cellspacing="0">
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="text-left">Id</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Total</th>
                    <th className="hidden text-right md:table-cell">Paid</th>
                    <th className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <p className="underline mb-2 ">
                          {item._id.slice(0, count) +
                            (item._id > count ? '...' : '')}
                        </p>
                      </td>
                      <td>
                        <p className="underline mb-2 ">
                          {moment(item.createddAt).format('MM/D/YYYY')}
                        </p>
                      </td>
                      <td>
                        <p className="underline mb-2 ">{item.totalPrice} €</p>
                      </td>
                      <td>
                        {item.isPaid ? (
                          <p className="underline mb-2 text-center bg-green-300 ">
                            Yes
                          </p>
                        ) : (
                          <p className="underline mb-2 text-center bg-red-400">
                            Not paid
                          </p>
                        )}
                      </td>
                      <td className="text-right">
                        <a
                          href="#"
                          class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded inline-flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreens;
