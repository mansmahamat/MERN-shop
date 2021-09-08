import React from 'react';

function Checkout({ step1, step2, step3, step4 }) {
  return (
    <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
      <div className="flex pb-3">
        <div className="flex-1"></div>

        {step4 ? (
          <div className="flex-1">
            <div className="w-10 h-10 bg-green-300 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-black text-center w-full">
                <i className="fa fa-check w-full fill-current black"></i>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <div className="w-10 h-10 bg-gray-200 mx-auto rounded-full text-lg text-black flex items-center">
              <span className="text-grey-darker text-center w-full">3</span>
            </div>
          </div>
        )}

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-red-300 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-red-300 text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-red-300 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">2</span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-red-300 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-red-300-light text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-red-300 border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">3</span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-red-300 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-red-300 text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-red-300 border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">4</span>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex text-xs content-center text-center">
        <div className="w-1/4">Sign In</div>

        <div className="w-1/4">{step2 ? 'Shipping 2' : 'Shipping'}</div>

        <div className="w-1/4">{step3 ? 'Payment' : 'Payment'}</div>

        <div className="w-1/4">{step4 ? 'Place Order' : 'Place Order'}</div>
      </div>
    </div>
  );
}

export default Checkout;
