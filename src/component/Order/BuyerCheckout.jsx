import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner'; // Import RotatingLines
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const BuyerCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carts, cartAmount } = location.state || {};
  const [user, setUser] = useState(null);
  const token = getToken();
  const [loading, setLoading] = useState(false); // State to manage loading
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('buyer'));
    if (!userData) {
      toast.error('Please login to place an order.');
      navigate('/sign-in');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const orderDetails = {
      buyerId: user.id,
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.postalCode,
      country: address.country,
      mobileNo: address.phone,
      deliveryAddress: `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`,
    };

    try {
      await axios.post(`${config.apiUrl}/orderr/placeorder`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully!');
      navigate('/order/payment', { 
        state: { 
          cartAmount,
          deliveryAddress: address // Pass the address object
        } 
      });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('There was an error placing the order:', error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  if (!carts) return <div>Loading...</div>;

  return (
    <div className="relative p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="black"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className={loading ? 'blur-sm' : ''}>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {carts.map(cart => (
          <div
            key={cart.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{cart.product.name}</h2>
              <p className="text-lg font-bold text-green-600">
                ₹{cart.product.price.toFixed(2)}
              </p>
              <p className="text-lg font-bold text-gray-700">
                Quantity: {cart.quantity}
              </p>
              <p className="text-lg font-bold text-gray-700">
                Total Amount: ₹{(cart.product.price * cart.quantity).toFixed(2)}
              </p>
            </div>
            <img
              src={`${config.apiUrl}/B2B/products/${cart.product.image1}`}
              alt={cart.product.name}
              className="max-w-xs object-cover mb-10"
            />
          </div>
        ))}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold">
            Total Cart Amount: ₹{cartAmount}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Place Orders
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerCheckout;
