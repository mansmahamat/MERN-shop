import React from 'react';
import { Link } from 'react-router-dom';

function Checkout({ step1, step2, step3, step4 }) {
  return (
    <div className="max-w-xl mb-24 mx-auto my-4 border-b-2 pb-4">
      <div className="flex pb-3">
        <div className="flex-1"></div>

        {step1 ? (
          <div className="flex-1">
            <Link
              to="/login"
              className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-black flex items-center"
            >
              <span className="text-grey-darker text-center w-full">1</span>
            </Link>
          </div>
        ) : (
          <div className="flex-1">
            <button className="w-10 h-10  disabled bg-gray-200 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-grey-darker text-center w-full">1</span>
            </button>
          </div>
        )}

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-green-600 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-green-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {step2 ? (
          <div className="flex-1">
            <Link
              to="/shipping"
              className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-black flex items-center"
            >
              <span className="text-grey-darker text-center w-full">2</span>
            </Link>
          </div>
        ) : (
          <div className="flex-1">
            <button className="w-10 disabled h-10 bg-gray-200 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-grey-darker text-center w-full">2</span>
            </button>
          </div>
        )}

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-green-600 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-green-600-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        {step3 ? (
          <div className="flex-1">
            <Link
              to="/payment"
              className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-black flex items-center"
            >
              <span className="text-grey-darker text-center w-full">3</span>
            </Link>
          </div>
        ) : (
          <div className="flex-1">
            <button className="w-10 disabled h-10 bg-gray-200 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-grey-darker text-center w-full">3</span>
            </button>
          </div>
        )}

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-green-600 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-green-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>

        {step4 ? (
          <div className="flex-1">
            <Link
              to="/placeorder"
              className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-black flex items-center"
            >
              <span className="text-grey-darker text-center w-full">4</span>
            </Link>
          </div>
        ) : (
          <div className="flex-1">
            <button className="w-10 disabled h-10 bg-gray-200 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-grey-darker text-center w-full">4</span>
            </button>
          </div>
        )}

        <div className="flex-1"></div>
      </div>

      <div className="flex text-xs content-center text-center">
        <div className="w-1/4">Sign In</div>

        <div className="w-1/4">Shipping</div>

        <div className="w-1/4">Payment</div>

        <div className="w-1/4">Order</div>
      </div>
    </div>
  );
}

export default Checkout;
