import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import config from '../config';
import { getToken } from '../utils/JWT_Token';
import { useInView } from 'react-intersection-observer';

// Loading Skeleton Component
const Skeleton = () => (
  <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-xl">
    <div className="space-y-4">
      <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
        <div className="h-4 w-1/2 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-center p-8 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg"
  >
    <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
    <p className="text-red-600 font-medium">{message}</p>
  </motion.div>
);

const ProductCategoryDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `${config.apiUrl}/B2B/categories/fetchAllCategories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <motion.div
      ref={ref}
      className="max-w-7xl mx-auto px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center -mt-12 space-y-6"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Explore Categories
        </h2>

        <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-full  " />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mt-5 space-x-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 "
      >
        {categories.map((category, i) => (
          <motion.div
            key={category.categoryId}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group relative bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50/50 via-fuchsia-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="relative z-10">
              {/* Icon Container */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="relative h-full"
                >
                  <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center backdrop-blur-sm">
                    <ShoppingBag className="w-10 h-10 text-gray-700 bg-clip-text bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </motion.div>
              </div>

              {/* Category Name */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  {category.categoryName}
                </h3>

                {/* Animated Underline */}
                <div className="h-0.5 w-0 mx-auto bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-600 group-hover:w-16 transition-all duration-300" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl" />
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProductCategoryDisplay;
