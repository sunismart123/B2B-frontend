// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-10">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap justify-between">
//           <div className="w-full md:w-1/4 mb-6 md:mb-0">
//             <h5 className="text-xl font-bold mb-4">About Us</h5>
//             <p className="text-sm">
//               We are a leading e-commerce platform providing a wide range of products and services to meet all your needs. Shop with us for a seamless and enjoyable shopping experience.
//             </p>
//           </div>
//           <div className="w-full md:w-1/4 mb-6 md:mb-0">
//             <h5 className="text-xl font-bold mb-4">Quick Links</h5>
//             <ul className="text-sm">
//               <li><a href="#" className="hover:underline">Home</a></li>
//               <li><a href="#" className="hover:underline">Shop</a></li>
//               <li><a href="#" className="hover:underline">About Us</a></li>
//               <li><a href="#" className="hover:underline">Contact Us</a></li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4 mb-6 md:mb-0">
//             <h5 className="text-xl font-bold mb-4">Customer Service</h5>
//             <ul className="text-sm">
//               <li><a href="#" className="hover:underline">FAQs</a></li>
//               <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
//               <li><a href="#" className="hover:underline">Privacy Policy</a></li>
//               <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4">
//             <h5 className="text-xl font-bold mb-4">Contact Us</h5>
//             <ul className="text-sm">
//               <li>Email: B2B@support.com</li>
//               <li>Phone: +123 456 7890</li>
//               <li>Address: 123 Main St, City, Country</li>
//             </ul>
//             <div className="mt-4">
//               <h5 className="text-xl font-bold mb-2">Follow Us</h5>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-blue-500 hover:text-blue-400" aria-label="Follow us on Twitter">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 002.17-2.72c-.95.56-2 1-3.12 1.23a4.92 4.92 0 00-8.37 4.49c-4.1-.2-7.73-2.17-10.16-5.15a4.92 4.92 0 001.52 6.56c-.83-.03-1.62-.25-2.3-.64v.06a4.92 4.92 0 003.95 4.82c-.4.11-.82.17-1.25.17-.31 0-.61-.03-.91-.08a4.93 4.93 0 004.6 3.42A9.86 9.86 0 010 21.54a13.92 13.92 0 007.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.43-.02-.64A9.96 9.96 0 0024 4.56z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-blue-700 hover:text-blue-600" aria-label="Follow us on Facebook">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M22.23 0H1.77A1.78 1.78 0 000 1.77v20.45A1.78 1.78 0 001.77 24h20.46A1.78 1.78 0 0024 22.23V1.77A1.78 1.78 0 0022.23 0zM7.2 20.2H3.8V9h3.4v11.2zm-1.7-12.8a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM20.2 20.2h-3.4v-5.5c0-1.3-.5-2.2-1.8-2.2-.9 0-1.5.6-1.7 1.2-.1.3-.1.6-.1 1v5.5h-3.4v-7c0-1.3-.1-2.3-.1-3.1H11v.4a4 4 0 013.6-2c2.6 0 4.6 1.7 4.6 5.4v6.4z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-pink-500 hover:text-pink-400" aria-label="Follow us on Instagram">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2.2c1.4.1 2.8.5 4.1 1.2 1.1.7 2.2 1.5 3.1 2.5 2.1 2.1 3.5 4.9 3.8 7.8.1 1.1.1 2.1 0 3.1a11.4 11.4 0 01-.4 2.7c-.3 1-.8 1.9-1.3 2.8a11.7 11.7 0 01-5.1 4.5c-1.1.4-2.3.7-3.5.8-1.2.1-2.3.1-3.5-.1-1.1-.2-2.2-.6-3.3-1.2-1.1-.6-2-1.3-2.8-2.2-1.3-1.4-2.4-3-3-4.9a11.3 11.3 0 01-.7-4.2c0-1.5.3-3 1-4.4.6-1.1 1.3-2.1 2.2-3a11.4 11.4 0 013-2.1 11.8 11.8 0 013.4-.8c.9 0 1.8.1 2.7.3zm-.6 1.6c-.6-.1-1.1-.2-1.6-.3a10.3 10.3 0 00-2.4.3 10 10 0 00-4.4 2.4 10.4 10.4 0 00-3 7.1 10.3 10.3 0 00.6 3.8 10 10 0 002.6 4.2 10 10 0 003.8 2.4c1.4.5 2.8.6 4.3.3 1.5-.3 2.8-.9 4-1.9 1.1-.9 2-2.2 2.5-3.5.4-1.2.6-2.5.5-3.8a10.2 10.2 0 00-.3-2.6 10 10 0 00-2.1-4.1 10.2 10.2 0 00-2.9-2.6 10.5 10.5 0 00-3.2-1.1c-.8 0-1.6-.1-2.3.2zm0 2.2a7.9 7.9 0 017.8 8c0 4.3-3.4 7.8-7.7 7.9a7.9 7.9 0 01-8-7.8c0-4.3 3.4-7.8 7.7-8zm0 2a5.8 5.8 0 100 11.6 5.8 5.8 0 000-11.6zm7.8-2.8a1.3 1.3 0 11-.1 2.5 1.3 1.3 0 01.1-2.5z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-red-600 hover:text-red-500" aria-label="Follow us on YouTube">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.498 6.186a2.978 2.978 0 00-2.1-2.1C19.301 3.521 12 3.521 12 3.521s-7.301 0-9.398.565a2.978 2.978 0 00-2.1 2.1C0 8.281 0 12 0 12s0 3.719.502 5.814a2.978 2.978 0 002.1 2.1c2.097.565 9.398.565 9.398.565s7.301 0 9.398-.565a2.978 2.978 0 002.1-2.1C24 15.719 24 12 24 12s0-3.719-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10 text-center text-sm text-gray-500">
//           &copy; 2024 Your Company. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About Us</h4>
            <p className="text-gray-400 text-sm">
              We are a leading e-commerce platform providing a wide range of products and services to meet all your needs. Shop with us for a seamless and enjoyable shopping experience.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Shop</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Follow us on Twitter">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Follow us on Facebook">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Follow us on Instagram">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Follow us on YouTube">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full bg-gradient-to-r from-gray-900 to-transparent animate-fade-in"></div>
      </div>
    </footer>
  );
};

export default Footer;