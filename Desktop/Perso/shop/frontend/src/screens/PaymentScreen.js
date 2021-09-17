import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../components/Checkout';
import { savePaymentMethod } from '../actions/cartActions';

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Checkout step1 step2 step3 />
      <div>
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: '600px' }}
        >
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Payment Method
            </h1>
          </div>
          <form
            onSubmit={submitHandler}
            className="mb-12 flex-col space-y-12 flex -mx-2"
          >
            <div className="px-2">
              <label
                htmlFor="type2"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-green-500"
                  name="paymentMethod"
                  id="PayPal"
                  value="PayPal"
                  checked
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  alt="PayPal"
                  className="h-8 ml-3"
                />
              </label>
            </div>
            {/* <div className="px-2">
              <label
                htmlFor="type1"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-green-500"
                  name="paymentMethod"
                  id="Stripe"
                  value="Stripe"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  alt="Card"
                  className="h-8 ml-3"
                />
              </label>
            </div> */}
            <div>
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaymentScreen;
