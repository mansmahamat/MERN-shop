import React, { useState } from 'react';
import { Link, useHistory, Route } from 'react-router-dom';
//import MenuItem from '../partials/Header/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUserAlt,
  faHome,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { createPopper } from '@popperjs/core';
import { logout } from '../actions/userActions';
import Swipeable from 'react-swipeable';
import SearchBox from '../partials/Header/SearchBox';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const avatar = (
    // viewer.id && viewer.avatar ? (
    <img
      className="inline object-cover w-12 h-12 mr-2 rounded-full"
      src=""
      alt="Profile "
    />
  );
  // ) : null;

  let path = `/login`;
  let history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    setNavbarOpen(false);
    history.push(path);
  };

  return (
    <nav className="px-10 py-8 bg-green-600">
      <div className="flex justify-between items-center">
        <Link onClick={() => setDropdownPopoverShow(false)} to="/">
          <img alt="Profile" src="/images/sprout.svg" className="h-12 w-12" />
          <p className="mr-2 text-xl">Plant Shop</p>
        </Link>

        <img className="h-10" src="" alt="" width="auto" />

        <div className="lg:hidden">
          <button
            className="block navbar-burger text-gray-50 hover:text-gray-200 focus:outline-none"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-10">
          <Link onClick={() => setDropdownPopoverShow(false)} to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link onClick={() => setDropdownPopoverShow(false)} to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>

          {userInfo ? (
            <>
              <li
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow
                    ? closeDropdownPopover()
                    : openDropdownPopover();
                }}
              >
                <FontAwesomeIcon icon={faUserAlt} /> {userInfo.name}{' '}
                {dropdownPopoverShow ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </li>

              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? 'block ' : 'hidden ') +
                  'text-base z-50 float-left bg-green-300 py-2 list-none text-left rounded shadow-lg mt-1'
                }
                style={{ minWidth: '12rem' }}
              >
                <Link
                  to="/profile"
                  className="text-sm py-2  hover:bg-green-600 px-4 font-normal block w-full whitespace-nowrap"
                  onClick={() => setDropdownPopoverShow(false)}
                >
                  Profile
                </Link>
                <span
                  className={
                    'text-sm py-2 hover:bg-green-600 px-4 font-normal block w-full whitespace-nowrap '
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  Link #1
                </span>
                <span
                  className={
                    'text-sm py-2 px-4 font-normal hover:bg-green-600 block w-full whitespace-nowrap  '
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  Link #2
                </span>

                <span
                  className={
                    'text-sm py-2 bg-red-400 px-4 font-normal block w-full whitespace-nowrap  '
                  }
                  onClick={logoutHandler}
                >
                  Logout
                </span>
              </div>
            </>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUserAlt} /> Sign In
            </Link>
          )}
        </ul>
        {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
      </div>
      <div
        className={
          ' navbar-menu relative z-50' + (navbarOpen ? ' block' : ' hidden')
        }
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center space-x-32 mb-20">
            <p className="mr-2">My Plants Shop 🌺</p>

            <button
              className="navbar-close"
              onClick={() => setNavbarOpen(false)}
            >
              <svg
                className="h-6 w-6 text-black cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            {userInfo && (
              <span className="flex">
                <p className="text-lg font-semibold mb-4">
                  Hello {userInfo.name} 😎
                </p>
              </span>
            )}
            {/* <input
              className="inline-block px-4 py-3 mb-2 text-sm text-gray-50 placeholder-gray-50 font-semibold bg-green-600 border border-transparent rounded-l"
              placeholder="Search"
              data-dashlane-rid="1d395ff59b419945"
              data-form-type="other"
            /> */}
            <ul className="flex flex-col">
              <Link
                to="/"
                onClick={() => setNavbarOpen(false)}
                className="mb-4"
              >
                <FontAwesomeIcon
                  className="mr-2 text-green-600"
                  icon={faHome}
                />
                Homepage
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setNavbarOpen(false)}
                    className="mb-4"
                  >
                    <FontAwesomeIcon
                      className="mr-2 text-green-600"
                      icon={faShoppingCart}
                    />
                    Cart
                  </Link>
                  <Link
                    to="/profile"
                    className="mb-4"
                    onClick={() => setNavbarOpen(false)}
                  >
                    <FontAwesomeIcon
                      className="mr-2 text-green-600"
                      icon={faUserAlt}
                    />
                    Profile
                  </Link>

                  <li
                    className="bg-red-400 py-2 mt-72 px-2 text-center mb-1"
                    onClick={logoutHandler}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <Link onClick={() => setNavbarOpen(false)} to="/login">
                  <FontAwesomeIcon className="mr-2" icon={faUserAlt} />
                  Sign In
                </Link>
              )}

              {/* {viewer.id && viewer.avatar ? (
                <li className="mb-1">
                  <Link
                    onClick={handleLogOut}
                    className="block p-4 mt-6 text-sm font-semibold bg-red-400 text-gray-900 rounded"
                    to="/login"
                  >
                    Log Out
                  
                </li>
              ) : null} */}
            </ul>
          </div>
          <div className="mt-auto">
            <p className="mt-6 mb-4 text-sm text-center text-gray-400">
              <span>© 2021 All rights reserved.</span>
            </p>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Header;
