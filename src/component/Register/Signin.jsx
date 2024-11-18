// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { saveToken } from '../../utils/JWT_Token';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';
// import config from '../../config';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [animate, setAnimate] = useState(false); // State for animation control
//   const navigate = useNavigate();

//   const { setIsAuthenticated, loginBuyer, loginSeller, loginAdmin } = useAuth();

//   const handleEmailChange = event => setEmail(event.target.value);
//   const handlePasswordChange = event => setPassword(event.target.value);

//   useEffect(() => {
//     // Scroll to the top of the page when the component mounts
//     window.scrollTo(0, 0);

//     // Trigger the slide-in animation with a delay
//     setTimeout(() => setAnimate(true), 200);
//   }, []);

//   const handleSubmit = async event => {
//     event.preventDefault();

//     try {
//       let apiUrl = email.includes('admin')
//         ? `${config.apiUrl}/admin/api/login`
//         : `${config.apiUrl}/B2B/buyer&seller/login`;

//       const response = await axios.post(apiUrl, { emailId: email, password });

//       if (response.status === 200) {
//         const token = response.data.jwtToken;
//         const userDetails =
//           response.data.buyer || response.data.seller || response.data.admin;

//         if (!userDetails) {
//           throw new Error('User details not found in the response');
//         }

//         saveToken(token);
//         localStorage.setItem('jwtToken', token);

//         if (userDetails.role === 'buyer') {
//           loginBuyer(userDetails);
//         } else if (userDetails.role === 'seller') {
//           loginSeller(userDetails);
//         } else if (userDetails.role === 'admin') {
//           loginAdmin(userDetails);
//         } else {
//           throw new Error('User role is undefined or unrecognized');
//         }

//         setIsAuthenticated(true);
//         setEmail('');
//         setPassword('');

//         toast.success('Login successful!');
//         setTimeout(() => navigate('/'), 2000);
//       } else {
//         toast.error('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       toast.error(`Error during login: ${error.message}`);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-end bg-cover bg-center transition-transform duration-700 ease-in-out transform ${
//         animate
//           ? 'translate-x-0 scale-100 opacity-100'
//           : 'translate-x-full scale-95 opacity-0'
//       }`}
//       style={{
//         backgroundImage:
//           'url(https://as1.ftcdn.net/v2/jpg/02/92/90/56/1000_F_292905667_yFUJNJPngYeRNlrRL4hApHWxuYyRY4kN.jpg)',
//       }}
//     >
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md m-8 transition-transform duration-700 ease-in-out transform">
//         <div className="flex justify-center mb-6">
//           <FaUserCircle size={50} className="text-gray-700" />
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-gray-700 font-bold mb-2"
//             >
//               Email
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-md">
//               <FaEnvelope className="ml-2 text-gray-500" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 autoComplete="email"
//                 required
//                 placeholder="Enter your email"
//                 className="w-full p-2 border-none rounded-md focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-bold mb-2"
//             >
//               Password
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-md">
//               <FaLock className="ml-2 text-gray-500" />
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 autoComplete="current-password"
//                 required
//                 placeholder="Enter your password"
//                 className="w-full p-2 border-none rounded-md focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <span>
//               <Link
//                 to="/users/login/mobile"
//                 className="text-blue-500 hover:underline"
//               >
//                 Login With Mobile
//               </Link>
//             </span>
//             <span>
//               <Link to="/user/forgot" className="text-blue-500 hover:underline">
//                 Forgot Password?
//               </Link>
//             </span>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>

//         <ToastContainer />
//         <div className="mt-6 ">
//           <span className="text-gray-600 mb-2">Don't have an account?</span>
//           <span>
//             {' '}
//             <Link to="/sign-up" className=" text-blue-600">
//               Create Your Free Account
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
// import { saveToken } from '../../utils/JWT_Token';
// import { useAuth } from '../../Context/AuthContext';
// import config from '../../config';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();
//   const { setIsAuthenticated, loginBuyer, loginSeller, loginAdmin } = useAuth();

//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes float {
//         0%, 100% { transform: translateY(0px); }
//         50% { transform: translateY(-20px); }
//       }
//       @keyframes gradient {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//       }
//       .gradient-bg {
//         background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #276f24e9, #51b008);
//         background-size: 400% 400%;
//         animation: gradient 15s ease infinite;
//       }
//     `;
//     document.head.appendChild(style);
//     setTimeout(() => setShowForm(true), 300);
//     return () => document.head.removeChild(style);
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     try {
//       const apiUrl = email.includes('admin')
//         ? `${config.apiUrl}/admin/api/login`
//         : `${config.apiUrl}/B2B/buyer&seller/login`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ emailId: email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         saveToken(data.jwtToken);
//         const userDetails = data.buyer || data.seller || data.admin;

//         if (userDetails.role === 'buyer') loginBuyer(userDetails);
//         else if (userDetails.role === 'seller') loginSeller(userDetails);
//         else if (userDetails.role === 'admin') loginAdmin(userDetails);

//         setIsAuthenticated(true);
//         toast.success('Welcome back! 🎉');
//         setTimeout(() => navigate('/'), 1500);
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center p-4">
//       {/* Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
//       </div>

//       {/* Main Container */}
//       <div className={`relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 transform transition-all duration-1000
//                       shadow-[0_0_50px_rgba(0,0,0,0.1)] ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Left Column - Welcome Message */}
//           <div className="hidden md:flex flex-col justify-center text-white p-8">
//             <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
//             <p className="text-xl mb-8">Enter your details to access your account</p>
//             <div className="relative">
//               <div className="absolute inset-0 bg-white/5 rounded-2xl transform -rotate-6" />
//               <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-2" />
//               <div className="relative bg-white/10 rounded-2xl p-6">
//                 <p className="text-lg mb-4">"The best platform for managing your business!"</p>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-white/20 rounded-full" />
//                   <div>
//                     <p className="font-semibold">John Smith</p>
//                     <p className="text-sm opacity-75">CEO, TechCorp</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Sign In Form */}
//           <div className="bg-white rounded-2xl p-8 shadow-2xl">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
//               <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl
//                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="Email address"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <div className="relative">
//                     <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl
//                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="Password"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="w-4 h-4 rounded text-blue-500" />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <Link to="/user/forgot" className="text-sm text-blue-500 hover:text-blue-600">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600
//                          hover:to-purple-600 text-white py-4 rounded-xl font-medium relative
//                          overflow-hidden group transition-all duration-300 ease-out hover:scale-[1.02]"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {isLoading ? 'Signing in...' : 'Sign in'}
//                   <FaArrowRight className={`transition-transform ${isLoading ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
//                 </span>
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-white text-gray-500">or continue with</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   { icon: FaGoogle, bg: 'bg-red-50 hover:bg-red-100' },
//                   { icon: FaApple, bg: 'bg-gray-50 hover:bg-gray-100' },
//                   { icon: FaFacebookF, bg: 'bg-blue-50 hover:bg-blue-100' }
//                 ].map((provider, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className={`${provider.bg} p-4 rounded-xl transition-all duration-300 hover:scale-105`}
//                   >
//                     <provider.icon className="w-5 h-5 mx-auto" />
//                   </button>
//                 ))}
//               </div>

//               <p className="text-center text-gray-600">
//                 Don't have an account?{' '}
//                 <Link to="/sign-up" className="text-blue-500 hover:text-blue-600 font-medium">
//                   Sign up for free
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </div>
//   );
// };

// export default Signin;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGoogle,
  FaApple,
  FaGithub,
  FaBuilding,
  FaBoxOpen,
  FaChartLine,
} from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import {
  Building2,
  BoxesIcon,
  BarChart3,
  Clock,
  Shield,
  Users2,
  Workflow,
  Truck,
  HeadingIcon,
  Eye, EyeOff
} from 'lucide-react';

import { saveToken } from '../../utils/JWT_Token';
import { useAuth } from '../../Context/AuthContext';
import config from '../../config';

const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// Animation variants for individual feature cards
const featureVariants = {
  hidden: { 
    y: -400,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "linear",
     
      duration: 2,
      x: { duration: 2 }
    }
  
  }
};

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const[showPassword,setShowPassword] = useState('');
  const { setIsAuthenticated, loginBuyer, loginSeller, loginAdmin } = useAuth();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes moveBackground {
        0% { background-position: 0% 0%; }
        100% { background-position: 100% 100%; }
      }
      .gradient-bg {
        background: linear-gradient(-45deg, #2a3f90, #23a6d5, #1e4d8f, #0f5257, #276f24e9, #1d4a9e,#051d29e9, #d6ff09);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
      }
      .floating-icon {
        animation: float 3s ease-in-out infinite;
      }
      .mesh-background {
        background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 2px, transparent 2px);
        background-size: 30px 30px;
        animation: moveBackground 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => setShowForm(true), 300);
    return () => document.head.removeChild(style);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const apiUrl = email.includes('admin')
        ? `${config.apiUrl}/admin/api/login`
        : `${config.apiUrl}/B2B/buyer&seller/login`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.jwtToken);
        const userDetails = data.buyer || data.seller || data.admin;

        if (userDetails.role === 'buyer') loginBuyer(userDetails);
        else if (userDetails.role === 'seller') loginSeller(userDetails);
        else if (userDetails.role === 'admin') loginAdmin(userDetails);

        setIsAuthenticated(true);
        toast.success('Welcome to your B2B dashboard! 🎉');
        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      Icon: BoxesIcon,
      title: 'Bulk Ordering',
      description:
        'Effortless bulk purchasing with an easy-to-navigate catalog, quick reorders, and competitive volume discounts for optimal savings.',
    },
    {
      Icon: GiReceiveMoney,
      title: 'Secure Payment',
      description:
        'Robust payment processing with multiple secure options, encryption, and fraud protection, ensuring your transactions are safe and reliable.',
    },
    {
      Icon: Truck,
      title: 'Doorstep Delivery',
      description:
        'Reliable, fast delivery right to your location, with tracking updates and flexible scheduling to fit your needs.',
    },
  ];

  return (
    <div className="min-h-full    gradient-bg relative  overflow-hidden flex items-center justify-center py-16">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 mesh-background opacity-20" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full floating-icon delay-0" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full floating-icon delay-100" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-500/20 rounded-full floating-icon delay-200" />
        {/* <div className="absolute bottom-50 left-20 w-32 h-32 bg-teal-400/20 rounded-full floating-icon delay-0" />
  <div className="absolute bottom-20 right-20 w-24 h-24 bg-rose-400/20 rounded-full floating-icon delay-300" />
  <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-amber-400/20 rounded-full floating-icon delay-0" /> */}
      </div>

      {/* Main Container */}
      <div
        className={`relative w-full max-w-5xl bg-white/20 backdrop-blur-lg rounded-3xl p-4 mt-3 transform transition-all duration-1000 
                      shadow-[0_0_50px_rgba(0,0,0,0.1)] ${
                        showForm
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-20 opacity-0'
                      }`}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Welcome Message & Features */}
          <div className="hidden md:flex flex-col justify-between text-white p-2 ">
            <div>
              <h1 className="text-5xl font-bold ">B2B Ecommerce</h1>
              <p className="text-xl mb-6">
                Your gateway to streamlined wholesale commerce
              </p>

              {/* Feature Cards */}
              <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {features.map((feature, index) => (
          <motion.div
          key={index}
          variants={featureVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform transition-all duration-300"
        >
            <div className="flex items-center space-x-4">
              <feature.Icon className="w-12 h-10 text-blue-300" />
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm opacity-75">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

            </div>
          </div>

          {/* Right Column - Sign In Form */}
          <div className="bg-gray-200 rounded-3xl p-4  shadow-2xl">
            <h2 className="text-3xl font-bold text-center pb-2  text-gray-800 -mt-2">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Business email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Password"
                      required
                      />
                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember this device
                  </span>
                </label>
                <Link
                  to="/user/forgot"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Reset password
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 
                         hover:to-blue-900 text-white py-3 rounded-xl font-medium relative 
                         overflow-hidden group transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? 'Authenticating...' : 'Login'}
                  <FaArrowRight
                    className={`transition-transform ${
                      isLoading ? 'opacity-0' : 'group-hover:translate-x-1'
                    }`}
                  />
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: FaGoogle,
                    label: 'Google',
                    bg: 'bg-white hover:bg-red-50',
                    border: 'border-red-100',
                    iconColor: 'text-red-500',
                  },
                  {
                    icon: FaApple,
                    label: 'Apple',
                    bg: 'bg-white hover:bg-gray-50',
                    border: 'border-gray-100',
                    iconColor: 'text-gray-800',
                  },
                  {
                    icon: FaGithub,
                    label: 'Facebook',
                    bg: 'bg-white hover:bg-blue-50',
                    border: 'border-blue-100',
                    iconColor: 'text-black-600',
                  },
                ].map((provider, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${provider.bg} p-4 rounded-xl transition-all duration-300 
                         transform hover:-translate-y-1 border ${provider.border}
                         shadow-sm hover:shadow-md`}
                  >
                    <provider.icon
                      className={`w-5 h-5 mx-auto ${provider.iconColor}`}
                    />
                  </button>
                ))}
              </div>

              <p className="text-center text-gray-600">
                New to our B2B platform?{' '}
                <Link
                  to="/sign-up"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Register here for Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Signin;
