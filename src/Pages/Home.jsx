
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ShoppingBag, Search, Menu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageCarousel from '../component/Navigation/ImageCaraousel';
import AllProducts from '../component/Product/AllProducts';
import { useAuth } from '../Context/AuthContext';
import Footer from '../component/Navigation/Footer';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../component/chatbot/chatbotConfig';
import MessageParser from '../component/chatbot/MessageParser';
import ActionProvider from '../component/chatbot/ActionProvider';
import ProductCategoryDisplay from './ProductCategoryDisplay';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center z-50">
        <div className="w-full max-w-sm mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-white mx-auto mb-6 animate-bounce" />
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-loadingBar"></div>
          </div>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white">
      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="relative h-[85vh] overflow-hidden">
          <div className="absolute inset-0  z-10" /> 
          <ImageCarousel />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center z-20"
          >
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-6xl font-light text-white leading-tight">
                  New Season
                  <br />
                  <span className="font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    New Style
                  </span>
                </h2>
                <p className="text-gray-200 text-lg max-w-md">
                  Discover our latest collection featuring premium designs and sustainable materials.
                </p>
                <button className="group bg-white px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300 flex items-center space-x-2">
                  <span>SHOP NEW ARRIVALS</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
     
      {/* Categories */}
      <section className="py-2">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ProductCategoryDisplay />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-18 -mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
          
            <h2 className="text-3xl font-medium text-center mb-2 ">Trending Now</h2>
            <AllProducts />
          </motion.div>
        </div>
      </section>



      {/* Chat Button with enhanced animation */}
      <motion.button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-8 right-8 z-50 animate-bounceColor text-white p-4 rounded-full hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {showChatbot ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chatbot with smooth animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showChatbot ? 1 : 0, y: showChatbot ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-16 py-5 right-8 z-50 ${!showChatbot && 'pointer-events-none'}`}
      >
        {showChatbot && (
          <div className=" rounded-lg px-9 overflow-hidden">
            
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        )}
      </motion.div>

      {isAuthenticated && <Footer />}

      <style jsx>{`
        .animate-loadingBar {
          animation: loadingBar 2s ease-in-out infinite;
        }

        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      
    </div>
  );
};

export default Home;