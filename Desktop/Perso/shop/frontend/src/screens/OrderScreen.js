import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  createOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen({ match, history }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, dispatch, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    window.location.reload();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <p>oo</p>
  ) : (
    <div className="container  p-12 mx-auto">
      <h1 className="mb-4">Order N° {order._id}</h1>
      <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
        <div className="flex flex-col md:w-full">
          <h3 className="mb-4 font-bold md:text-xl text-heading ">
            Informations
          </h3>
          <p>
            <span className="font-bold mr-1">Name :</span>
            <span className="ml-1">{userLogin.userInfo?.name}</span>
          </p>
          <p>
            <span className="font-bold mr-1">Email :</span>
            <span className="ml-1">{userLogin.userInfo?.email}</span>
          </p>
          <p>
            <span className="font-bold mr-1">Address :</span>
            <span className="mr-1">{order.shippingAddress?.address},</span>
            <span className="mr-1">{order.shippingAddress?.city}</span>
            {order.shippingAddress?.postalCode
              ? order.shippingAddress.postalCode
              : ''}
            ,<span className="ml-1">{order.shippingAddress?.country}</span>
            {/* {order.isDelivered ? (
              <p className="mt-2 bg-green-200 px-2 py-2 text-center">
                isDelivered on {order.deliverAt}
              </p>
            ) : (
              <p className="mt-2 bg-red-200 px-2 py-2 text-center">
                Not Delivered
              </p>
            )} */}
          </p>

          <hr className="my-6" />
          <h3 className="mb-4 font-bold md:text-xl text-heading ">
            Payment method
          </h3>
          <p>
            <span className="font-semibold mr-1">Method :</span>
            {order?.paymentMethod}
          </p>
          {order.isPaid ? (
            <p className="mt-2 bg-green-200 px-2 py-2 text-center">
              Paid on {''}
              {moment(order.paidAt).format('MMMM Do YYYY')}
            </p>
          ) : (
            <p className="mt-2 bg-red-200 px-2 py-2 text-center">Not Paid</p>
          )}
          <hr className="my-6" />
          <h3 className="mb-4 font-bold md:text-xl text-heading ">Order</h3>
          {order.orderItems.length === 0 ? (
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
                    {order?.orderItems.map((item) => (
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
          {order.orderItems.length === 0 ? (
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">Your cart is empty</div>
            </div>
          ) : (
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  {order?.orderItems.map((item) => (
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
                  {order?.orderItems.length} Items
                </h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal
                <span className="ml-2">{order.itemsPrice.toFixed(2)} €</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping
                <span className="ml-2">{order.shippingPrices} €</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Tax
                <span className="ml-2">{order.taxPrice} €</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">{order.totalPrice} €</span>
              </div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
