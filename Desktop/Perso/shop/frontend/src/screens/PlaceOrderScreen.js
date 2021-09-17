import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { createOrder } from '../actions/orderActions';

function PlaceOrderScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  //Price order

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 599.99 ? 0 : 100;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <Checkout step1 step2 step3 step4 />

      <div className="container  p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h3 className="mb-4 font-bold md:text-xl text-heading ">
              Informations
            </h3>
            <p>
              <span className="font-semibold mr-1">Name :</span>
              <span className="ml-1">{userLogin.userInfo?.name}</span>
            </p>
            <hr className="my-6" />
            <h3 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h3>
            <p>
              <span className="font-semibold mr-1">Address :</span>
              <span className="mr-1">{cart.shippingAddress?.address},</span>
              <span className="mr-1">{cart.shippingAddress?.city}</span>
              {cart.shippingAddress?.postalCode
                ? cart.shippingAddress.postalCode
                : ''}
              ,<span className="ml-1">{cart.shippingAddress?.country}</span>
            </p>
            <hr className="my-6" />
            <h3 className="mb-4 font-bold md:text-xl text-heading ">
              Payment method
            </h3>
            <p>
              <span className="font-semibold mr-1">Method :</span>
              {cart?.paymentMethod}
            </p>
            <hr className="my-6" />
            <h3 className="mb-4 font-bold md:text-xl text-heading ">Order</h3>
            {cart.cartItems.length === 0 ? (
              <div className="text-center bg-red-300">
                Your Cart is empty,
                <Link to="/" className="ml-2 font-semibold underline">
                  Go to shop
                </Link>
              </div>
            ) : (
              <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th class="py-3 px-6 text-left">Name</th>

                        <th class="py-3 px-6 text-center">Quantity</th>
                        <th class="py-3 px-6 text-center">Price</th>
                        <th class="py-3 px-6 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      {cart?.cartItems.map((item) => (
                        <tr class="text-gray-700">
                          <td class="px-4 py-3 border">
                            <Link
                              to={`/plant/${item.product}`}
                              class="flex items-center  font-semibold hover:underline text-sm"
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td class="px-4 py-3 text-center text-sm font-semibold border">
                            {item.qty}
                          </td>
                          <td class="px-4 text-center py-3 text-sm border">
                            {item.price}
                          </td>
                          <td class="px-4 py-3 text-sm text-center border">
                            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {(item.price * item.qty).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            {cart.cartItems.length === 0 ? (
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">Your cart is empty</div>
              </div>
            ) : (
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  <div className="flex flex-col space-y-4">
                    {cart?.cartItems.map((item) => (
                      <div className="flex space-x-4">
                        <Link to={`/plant/${item.product}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            to={`/plant/${item.product}`}
                            className="text-xl text-green-600 hover:underline font-bold"
                          >
                            {item.name}
                          </Link>
                          <span className="font-semibold">Price : </span>{' '}
                          {item.price} €
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex p-4 mt-4">
                  <h2 className="text-xl font-bold">
                    {cart?.cartItems.length} Items
                  </h2>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal
                  <span className="ml-2">{cart.itemsPrice.toFixed(2)} €</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Shipping
                  <span className="ml-2">{cart.shippingPrice} €</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Tax
                  <span className="ml-2">{cart.taxPrice} €</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total<span className="ml-2">{cart.totalPrice} €</span>
                </div>
                {error && (
                  <p className="w-80 text-center text-sm mb-8 font-semibold text-red-700 tracking-wide cursor-pointer">
                    {error}
                  </p>
                )}
                <div className="mt-4">
                  <button
                    disabled={cart.cartItems === 0}
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="button"
                    onClick={placeOrderHandler}
                  >
                    Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
