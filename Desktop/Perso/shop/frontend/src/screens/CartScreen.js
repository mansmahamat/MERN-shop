import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen({ match, location, history }) {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (productId, qty) => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className="container mx-auto mt-10">
      {cartItems.length === 0 ? (
        <div
          key={cartItems.id}
          className="flex bg-red-400 justify-center border-b pb-8"
        >
          <h3 className="font-semibold text-2xl">Cart is empty</h3>
        </div>
      ) : (
        <div className="flex flex-col  lg:flex-row shadow-md my-10">
          <div className=" lg:w-3/4  bg-white px-10 py-10">
            <div className="flex  justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            </div>

            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              >
                <div className="flex ">
                  <div className="w-20">
                    <img className="h-24 " src={item.image} alt={item.name} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-green-500 font-bold text-sm">
                      {item.category}
                    </span>
                    <span
                      onClick={() => removeFromCartHandler(item.product)}
                      className="font-bold flex hover:text-red-600 text-gray-500 text-xs"
                    >
                      Remove
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current ml-2  w-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <form>
                    <select
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.qty}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item.price.toFixed(2)} €
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {(item.price * item.qty).toFixed(2)} €
                </span>
              </div>
            ))}

            <Link
              to="/"
              className="flex font-bold text-green-600  text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-green-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="lg:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} Plants
              </span>
              <span className="font-semibold text-sm">
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
                €
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping </option>
              </select>
            </div>
            <div className="py-10" />

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                  €
                </span>
              </div>
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
