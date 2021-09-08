/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlgoliaPlaces from 'algolia-places-react';
import { saveShippingAddress } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import Checkout from '../components/Checkout';

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  // console.log(process.env.REACT_APP_NOT_SECRET_CODE);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    history.push('/payment');
  };

  return (
    <div className=" flex flex-col mt-32 mb-20 justify-center items-center">
      <Checkout step1 step2 />
      <form
        className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
        onSubmit={submitHandler}
      >
        <h2 className="text-center mb-6 text-xl font-semibold">
          Shipping Address
        </h2>
        <p className="text-gray-800 font-medium">Customer information</p>

        <div className="mt-2">
          <label className=" block text-sm text-gray-600">Address</label>
          <AlgoliaPlaces
            required
            placeholder={address}
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            options={{
              appId: process.env.REACT_APP_ID,
              apiKey: process.env.REACT_APP_KEY,
              language: 'en',
              type: 'address',
              // Other options from https://community.algolia.com/places/documentation.html#options
            }}
            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
              {
                setAddress(suggestion.name);
                setCity(suggestion.city);
                setCountry(suggestion.country);
                setPostalCode(suggestion.postcode);
              }
            }}
          />
        </div>
        <div className="mt-2">
          <label className=" text-sm block text-gray-600">City</label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            type="text"
            value={city}
            readOnly
            placeholder={city ? city : 'Paris'}
          />
        </div>
        <div className="inline-block mt-2 w-1/2 pr-1">
          <label className=" block text-sm text-gray-600">Country</label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            type="text"
            readOnly
            value={country}
            placeholder={country ? country : 'France'}
          />
        </div>
        <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
          <label className=" block text-sm text-gray-600">Zip</label>
          <input
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            type="text"
            readOnly
            value={postalCode}
            placeholder={postalCode ? postalCode : '75008'}
          />
        </div>

        <div className="mt-4">
          <button
            className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;
