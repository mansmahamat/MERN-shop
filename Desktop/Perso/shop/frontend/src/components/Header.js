import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../partials/Header/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const avatar = (
    // viewer.id && viewer.avatar ? (
    <img
      className="inline object-cover w-12 h-12 mr-2 rounded-full"
      src=""
      alt="Profile "
    />
  );
  // ) : null;

  return (
    <nav className="px-10 py-8 bg-green-600">
      <div className="flex justify-between items-center">
        <Link to="/">
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
          <li>Home pc</li>
          <li>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </li>
          <li>
            {' '}
            <FontAwesomeIcon icon={faUserAlt} /> Sign In
          </li>
          <li>Link b3</li>
        </ul>
        <div className="hidden lg:flex" data-dashlane-rid="aa60bf5d1d368b80">
          <input
            className="inline-block px-4 py-3 text-sm text-black placeholder-black font-semibold bg-white border border-transparent rounded-l"
            placeholder="Search"
            data-dashlane-rid="1d395ff59b419945"
            data-form-type="other"
          />
          <button
            className="px-2 rounded-r bg-white"
            data-dashlane-rid="90270769c7bfc34d"
            data-dashlane-label="true"
            data-form-type="other"
          >
            <svg
              className="text-black w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          {/* <MenuItem /> */}
        </div>
      </div>
      <div
        className={
          ' navbar-menu relative z-50' + (navbarOpen ? ' block' : ' hidden')
        }
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <p className="mr-2">Plat Shop</p>
            <img className="h-10" src="" alt="" width="auto" />

            <button
              className="navbar-close"
              onClick={() => setNavbarOpen(false)}
            >
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
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
          <div>
            {avatar}
            <input
              className="inline-block px-4 py-3 text-sm text-gray-50 placeholder-gray-50 font-semibold bg-green-600 border border-transparent rounded-l"
              placeholder="Search"
              data-dashlane-rid="1d395ff59b419945"
              data-form-type="other"
            />
            <ul>
              {/* {!viewer.id && !viewer.avatar ? (
                <li className="mb-1">
                  <Link
                    className="block p-4 mt-6 text-sm font-semibold bg-green-400 text-gray-900 rounded"
                    to="/login"
                  >
                    Sign Up
                  
                </li>
              ) : null} */}
              <li className="mb-1">Home mobile</li>
              <li className="mb-1">Profile</li>
              <li className="mb-1">Link 2</li>
              <li className="mb-1">Link 3</li>
              <hr />
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
