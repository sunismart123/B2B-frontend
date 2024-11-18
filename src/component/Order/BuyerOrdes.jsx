
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Calendar, DollarSign, Box } from 'lucide-react';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const buyerId = JSON.parse(localStorage.getItem('buyer')).id;
  const token = getToken();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        toast.error('Authentication token not found. Please login again.', {
          position: 'top-center',
          autoClose: 2000,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${config.apiUrl}/order/findByBuyerid`,
          {
            params: { buyerid: buyerId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders. Please try again later.', {
          position: 'top-center',
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [buyerId, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <ShoppingBag className="w-12 h-12 text-sky-500" />
        </motion.div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4  sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-extrabold text-gray-900 mb-4"
          >
            My Orders
          </motion.h2>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 bg-white rounded-lg shadow"
          >
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No Orders Yet</h3>
            <p className="mt-2 text-gray-500">Start shopping to see your orders here!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                variants={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="p-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex items-center">
                      <Package className="w-6 h-6 text-sky-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderId}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.product.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-sky-100 text-sky-800">
                        ₹{order.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: selectedOrder === order.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <Box className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Quantity</p>
                          <p className="text-lg font-semibold text-gray-900">{order.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-900">₹{order.amount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Order Date</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(order.orderTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BuyerOrders;