// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CheckCircleIcon } from '@heroicons/react/24/solid';
// import config from '../../config';
// import { getToken } from '../../utils/JWT_Token';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { carts, cartAmount } = location.state || {};
//   const [paymentMethod, setPaymentMethod] = useState('online');
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [amount, setAmount] = useState(cartAmount ? cartAmount * 100 : 0); // Initialize amount from location.state
//   const token = getToken();

//   useEffect(() => {
//     // Load the Razorpay script dynamically
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script); // Cleanup the script on component unmount
//     };
//   }, []);

//   const handlePaymentMethodChange = event => {
//     setPaymentMethod(event.target.value);
//   };

//   const clearCart = () => {
//     // Clear the cart from localStorage
//     localStorage.removeItem('cart');
//   };

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post(
//         `${config.apiUrl}/api/createOrderFromCarts?amount=${cartAmount}&currency=INR`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       const order = response.data;

//       const options = {
//         key: 'rzp_test_tDyTm24qcfv5o0', // Enter the Key ID generated from the Dashboard
//         amount: order.amount, // Amount in paise
//         currency: order.currency,
//         name: 'Acme Corp',
//         description: 'Test Transaction',
//         order_id: order.id, // Order ID returned from Razorpay
//         handler: function (response) {
//           alert('Payment ID: ' + response.razorpay_payment_id);
//           alert('Order ID: ' + response.razorpay_order_id);
//           alert('Signature: ' + response.razorpay_signature);
//           setOrderSuccess(true);
//           clearCart();
//           setTimeout(() => {
//             navigate('/');
//           }, 3000);
//         },
//         prefill: {
//           name: 'Dattakumar',
//           email: 'dattu@gmail.com',
//           contact: '9999999999',
//         },
//         notes: {
//           address: 'Razorpay Corporate Office',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (paymentMethod === 'online') {
//       handlePayment();
//     } else {
//       // Handle COD logic here
//       setOrderSuccess(true);
//       clearCart();
//       setTimeout(() => {
//         navigate('/');
//       }, 3000);
//     }
//   };

//   return (
//     <div className="p-8 flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-8">Payment</h1>
//       {!orderSuccess ? (
//         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Select Payment Method
//               </label>
//               <div className="flex space-x-4">
//                 <label className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="online"
//                     checked={paymentMethod === 'online'}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio text-blue-500"
//                   />
//                   <span className="ml-2">Online Payment</span>
//                 </label>
//                 <label className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio text-blue-500"
//                   />
//                   <span className="ml-2">Cash on Delivery (COD)</span>
//                 </label>
//               </div>
//             </div>

//             {paymentMethod === 'online' && (
//               <div className="space-y-4">
//                 {/* Additional UI for online payment if needed */}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//             >
//               {paymentMethod === 'online' ? 'Pay with Razorpay' : 'Place Order'}
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center">
//           <CheckCircleIcon className="w-24 h-24 text-green-500" />
//           <p className="text-2xl font-bold text-green-500 mt-4">
//             Order placed successfully!
//           </p>
//           <p className="text-gray-700 mt-2">Redirecting to home page...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CreditCard,
  Wallet,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartAmount, deliveryAddress } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const token = getToken();
  const buyer = JSON.parse(localStorage.getItem('buyer'));

  useEffect(() => {
    if (!cartAmount || !deliveryAddress) {
      toast.error('Missing order information');
      navigate('/buyers/view/cart');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [cartAmount, deliveryAddress, navigate]);
  console.log(cartAmount);
  const clearCart = () => {
    localStorage.removeItem('cart');
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError('');

    try {
      const orderData = {
        buyerId: buyer.id,
        deliveryAddress: deliveryAddress.street,
        buyerName: deliveryAddress.name,
        buyerMobileNo: deliveryAddress.phone,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        pincode: deliveryAddress.postalCode,
        street: deliveryAddress.street,
        country: deliveryAddress.country,
      };

      const response = await axios.post(
        `${config.apiUrl}/payments/createOrderFromCarts`,

        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      const options = {
        key: 'rzp_test_tDyTm24qcfv5o0',
        amount: cartAmount * 100,
        currency: 'INR',
        name: 'B2B',
        description: 'Purchase Payment',
        order_id: response.data.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          amount: cartAmount * 100,
          name: deliveryAddress.name,
          email: buyer.email,
          contact: deliveryAddress.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError('Failed to process payment. Please try again.');
      toast.error('Payment initialization failed');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async response => {
    try {
      // Here you would typically verify the payment with your backend
      setOrderSuccess(true);
      clearCart();
      toast.success('Payment successful!');
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      setError('Failed to verify payment. Please contact support.');
    }
  };

  const handleCashOnDelivery = async () => {
    setProcessing(true);
    try {
      // Implement COD order creation
      const orderData = {
        buyerId: buyer.id,
        deliveryAddress: deliveryAddress.street,
        buyerName: deliveryAddress.name,
        buyerMobileNo: deliveryAddress.phone,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        pincode: deliveryAddress.postalCode,
        street: deliveryAddress.street,
        country: deliveryAddress.country,
        paymentMethod: 'COD',
      };

      // await axios.post(
      //    `${config.apiUrl}/api/payment/createOrderFromCarts`,

      //   orderData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );

      setOrderSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
      setTimeout(() => {
        navigate('/orders');
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Failed to place order. Please try again.');
      toast.error('Order placement failed');
    } finally {
      setProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Order Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. You will be redirected to your
              orders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Online Payment</h3>
                      <p className="text-sm text-gray-500">
                        Pay securely with Razorpay
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">₹{cartAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">₹{cartAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={
                  paymentMethod === 'online'
                    ? handlePayment
                    : handleCashOnDelivery
                }
                disabled={processing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {paymentMethod === 'online' ? (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Pay Now</span>
                      </>
                    ) : (
                      <>
                        <Truck className="w-5 h-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
