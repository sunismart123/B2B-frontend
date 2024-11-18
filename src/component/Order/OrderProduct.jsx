// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const OrderProduct = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product, initialQuantity } = location.state || {};
//   const [user, setUser] = useState(null); // Initialize user state
//   const [quantity, setQuantity] = useState(initialQuantity || 1);
//   const [totalAmount, setTotalAmount] = useState(product ? product.price * quantity : 0);

//   const [address, setAddress] = useState({
//     name: '',
//     street: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: '',
//     phone: '',
//   });

//   useEffect(() => {
//     // Check if user is logged in
//     const userData = JSON.parse(localStorage.getItem('buyer'));
//     if (!userData) {
//       toast.error("Please login to place an order.");
//       navigate('/sign-in');
//     } else {
//       setUser(userData);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (product) {
//       setTotalAmount(product.price * quantity);
//     }
//   }, [quantity, product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prevAddress) => ({
//       ...prevAddress,
//       [name]: value,
//     }));
//   };

//   const handleQuantityChange = (e) => {
//     setQuantity(Number(e.target.value));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle order submission logic here, e.g., sending order details to the server
//     toast.success('Address addes successfully!');
//     navigate('/order/payment');
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Order Product</h1>
//       <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//         <h2 className="text-xl font-semibold">{product.name}</h2>
//         <p className="text-lg font-bold text-green-600">₹{product.price.toFixed(2)}</p>
//         <div className="flex items-center mb-2">
//           <label className="text-sm text-gray-500 mr-2">Quantity:</label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="1"
//             className="border rounded p-1 w-16"
//           />
//         </div>
//         <p className="text-lg font-bold text-gray-700">Total Amount: ₹{totalAmount.toFixed(2)}</p>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={address.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Street</label>
//           <input
//             type="text"
//             name="street"
//             value={address.street}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">City</label>
//           <input
//             type="text"
//             name="city"
//             value={address.city}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">State</label>
//           <input
//             type="text"
//             name="state"
//             value={address.state}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Postal Code</label>
//           <input
//             type="text"
//             name="postalCode"
//             value={address.postalCode}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Country</label>
//           <input
//             type="text"
//             name="country"
//             value={address.country}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={address.phone}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OrderProduct;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const OrderProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, initialQuantity } = location.state || {};
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [totalAmount, setTotalAmount] = useState(
    product ? product.price * quantity : 0,
  );
  const [user, setUser] = useState(null);
  const token = getToken();
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
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('buyer'));
    if (!userData) {
      toast.error('Please login to place an order.');
      navigate('/sign-in');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  useEffect(() => {
    if (product) {
      setTotalAmount(product.price * quantity);
    }
  }, [quantity, product]);

  const handleChange = e => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleQuantityChange = e => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async e => {
    e.preventDefault();
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
      productId: product.id,
      quantity: quantity,
      totalAmount: totalAmount,
    };

    try {
      await axios.post(`${config.apiUrl}/order/placeorder`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully!');
      navigate('/order/payment');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('There was an error placing the order:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Order Product</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-lg font-bold text-green-600">
            ₹{product.price.toFixed(2)}
          </p>
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-500 mr-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="border rounded p-1 w-16"
            />
          </div>
          <p className="text-lg font-bold text-gray-700">
            Total Amount: ₹{totalAmount.toFixed(2)}
          </p>
        </div>
        <img
          src={`${config.apiUrl}/B2B/products/${product.image1}`}
          alt={product.name}
          className="max-w-xs  object-cover mb-10"
        />
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderProduct;
