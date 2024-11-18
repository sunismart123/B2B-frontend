// // Navbar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaUserPlus, FaSignInAlt, FaBars } from 'react-icons/fa';
// import { useAuth } from '../../Context/AuthContext';
// import AdminNavbar from './AdminNavbar';
// import BuyerNavbar from './BuyerNavabar';
// import SellerNavbar from './SellerNavbar';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isAuthenticated, buyer, seller, admin } = useAuth();
//   const navbarRef = useRef(null);

//   const toggleNavbar = () => {
//     setIsOpen(prev => !prev);
//   };

//   const closeNavbar = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         closeNavbar();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className="bg-orange-500 overflow-hidden whitespace-nowrap">
//         <div className="w-full animate-marquee inline-block">
//           <span className="font-extrabold mr-8 animate-blinkColors" style={{ fontFamily: 'Times New Roman, serif' }}></span>
//         </div>
//       </div>

//       <nav className="h-16 flex justify-between items-center bg-gray-900 p-4 relative z-50" ref={navbarRef}>
//         <div className="flex items-center">
//           <Link to="/">
//             <img src="logo.gif" alt="logo" className="h-16 mr-4" />
//           </Link>
//         </div>

//         <button
//           className="md:hidden text-white text-2xl p-2 hover:text-red-400 focus:outline-none"
//           onClick={toggleNavbar}
//           aria-expanded={isOpen}
//           aria-label="Toggle navigation"
//         >
//           <FaBars />
//         </button>

//         <div className={`
//           md:flex md:flex-row md:items-center
//           ${isOpen ? 'flex' : 'hidden'}
//           flex-col
//           absolute md:relative
//           top-16 md:top-auto
//           left-0 md:left-auto
//           w-full md:w-auto
//           bg-gray-800 md:bg-transparent
//           z-40
//           transition-all duration-200 ease-in-out
//           md:translate-y-0
//           ${isOpen ? 'translate-y-0' : '-translate-y-2'}
//           shadow-lg md:shadow-none
//         `}>
//           {!isAuthenticated ? (
//             <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
//               <Link
//                 to="/"
//                 onClick={closeNavbar}
//                 className="text-white text-lg flex items-center gap-2 hover:text-red-400 transition-colors"
//               >
//                 <FaHome /> Home
//               </Link>
//               <Link
//                 to="/sign-up"
//                 onClick={closeNavbar}
//                 className="text-white text-lg flex items-center gap-2 hover:text-red-400 transition-colors"
//               >
//                 <FaUserPlus /> Sign Up
//               </Link>
//               <Link
//                 to="/sign-in"
//                 onClick={closeNavbar}
//                 className="text-white text-lg flex items-center gap-2 hover:text-red-400 transition-colors"
//               >
//                 <FaSignInAlt /> Sign In
//               </Link>
//             </div>
//           ) : (
//             <div className="w-full">
//               {buyer && <BuyerNavbar onClose={closeNavbar} />}
//               {seller && <SellerNavbar onClose={closeNavbar} />}
//               {admin && <AdminNavbar onClose={closeNavbar} />}
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar ;

// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import { useCart } from '../../Context/CartContext';
// import { clearToken } from '../../utils/JWT_Token';
// import { toast } from 'react-toastify';
// import {
//   FaHome,
//   FaUserPlus,
//   FaSignInAlt,
//   FaBars,
//   FaShoppingCart,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaClipboardList,
//   FaBoxOpen,
//   FaPlus,
//   FaTags,
//   FaChevronDown,
//   FaTimes
// } from 'react-icons/fa';

// const NavLink = ({ to, icon: Icon, label, onClick, badge }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="group flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//   >
//     <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-gray-600 transition-colors duration-200">
//       <Icon className="text-xl text-gray-300 group-hover:text-white transition-colors duration-200" />
//     </span>
//     <span className="ml-3 text-gray-300 group-hover:text-white transition-colors duration-200">
//       {label}
//     </span>
//     {badge && (
//       <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
//         {badge}
//       </span>
//     )}
//   </Link>
// );

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const { isAuthenticated, buyer, seller, admin, setIsAuthenticated } = useAuth();
//   const { cartItemCount } = useCart();
//   const navbarRef = useRef(null);
//   const profileDropdownRef = useRef(null);

//   const toggleNavbar = () => setIsOpen(prev => !prev);
//   const closeNavbar = () => setIsOpen(false);
//   const toggleProfileDropdown = () => setProfileOpen(prev => !prev);

//   const handleLogout = () => {
//     localStorage.clear();
//     clearToken();
//     setIsAuthenticated(false);
//     toast.success('Logged out successfully!', {
//       position: 'top-center',
//       autoClose: 2000,
//     });
//     closeNavbar();
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         closeNavbar();
//       }
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative">
//       {/* Announcement Bar */}
//       {/* <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 py-1 overflow-hidden">
//         <div className="animate-marquee whitespace-nowrap">
//           <span className="inline-block px-4 text-white font-semibold">
//             🎉 Welcome to our store! Free shipping on orders over $50
//           </span>
//         </div>
//       </div> */}

//       {/* Main Navbar */}
//       <nav
//         ref={navbarRef}
//         className="bg-gray-900 shadow-lg border-b border-gray-800"
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center">
//               <Link to="/" className="flex items-center">
//                 <img
//                   src="logo.gif"
//                   alt="logo"
//                   className="h-12 w-auto filter brightness-110 hover:brightness-125 transition-all duration-200"
//                 />
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
//               onClick={toggleNavbar}
//             >
//               {isOpen ? (
//                 <FaTimes className="h-6 w-6" />
//               ) : (
//                 <FaBars className="h-6 w-6" />
//               )}
//             </button>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex md:items-center md:space-x-4">
//               {!isAuthenticated ? (
//                 <>
//                   <NavLink to="/" icon={FaHome} label="Home" />
//                   <NavLink to="/sign-up" icon={FaUserPlus} label="Sign Up" />
//                   <NavLink to="/sign-in" icon={FaSignInAlt} label="Sign In" />
//                 </>
//               ) : buyer ? (
//                 <>
//                   <NavLink
//                     to="/buyers/view/cart"
//                     icon={FaShoppingCart}
//                     label="Cart"
//                     badge={cartItemCount > 0 ? cartItemCount : null}
//                   />
//                   <NavLink to="/buyers/orders" icon={FaClipboardList} label="Orders" />
//                   <div className="relative" ref={profileDropdownRef}>
//                     <button
//                       onClick={toggleProfileDropdown}
//                       className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                     >
//                       <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-600 transition-colors duration-200">
//                         <FaUserCircle className="text-xl text-gray-300 hover:text-white" />
//                       </span>
//                       <span className="ml-3 text-gray-300 hover:text-white">Profile</span>
//                       <FaChevronDown className={`ml-2 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
//                     </button>

//                     {/* Profile Dropdown */}
//                     {profileOpen && (
//                       <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
//                         <Link
//                           to="/profile"
//                           className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//                         >
//                           <FaUserCircle className="inline mr-2" /> My Profile
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//                         >
//                           <FaSignOutAlt className="inline mr-2" /> Sign Out
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : seller ? (
//                 <>
//                   <NavLink to="/sellers/all/category" icon={FaBoxOpen} label="Categories" />
//                   <NavLink to="/sellers/add/category" icon={FaPlus} label="Add Category" />
//                   <NavLink to="/sellers/add/product" icon={FaTags} label="Add Product" />
//                   <div className="relative" ref={profileDropdownRef}>
//                     <button
//                       onClick={toggleProfileDropdown}
//                       className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                     >
//                       <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-600 transition-colors duration-200">
//                         <FaUserCircle className="text-xl text-gray-300 hover:text-white" />
//                       </span>
//                       <span className="ml-3 text-gray-300 hover:text-white">Seller Profile</span>
//                       <FaChevronDown className={`ml-2 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
//                     </button>

//                     {profileOpen && (
//                       <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
//                         <Link
//                           to="/profile"
//                           className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//                         >
//                           <FaUserCircle className="inline mr-2" /> Seller Dashboard
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//                         >
//                           <FaSignOutAlt className="inline mr-2" /> Sign Out
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : null}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div
//           className={`md:hidden transition-all duration-300 ease-in-out ${
//             isOpen
//               ? 'max-h-screen opacity-100 visible'
//               : 'max-h-0 opacity-0 invisible'
//           }`}
//         >
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {!isAuthenticated ? (
//               <>
//                 <NavLink to="/" icon={FaHome} label="Home" onClick={closeNavbar} />
//                 <NavLink to="/sign-up" icon={FaUserPlus} label="Sign Up" onClick={closeNavbar} />
//                 <NavLink to="/sign-in" icon={FaSignInAlt} label="Sign In" onClick={closeNavbar} />
//               </>
//             ) : buyer ? (
//               <>
//                 <NavLink
//                   to="/buyers/view/cart"
//                   icon={FaShoppingCart}
//                   label="Cart"
//                   badge={cartItemCount > 0 ? cartItemCount : null}
//                   onClick={closeNavbar}
//                 />
//                 <NavLink to="/buyers/orders" icon={FaClipboardList} label="Orders" onClick={closeNavbar} />
//                 <NavLink to="/profile" icon={FaUserCircle} label="Profile" onClick={closeNavbar} />
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                 >
//                   <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-600 transition-colors duration-200">
//                     <FaSignOutAlt className="text-xl text-gray-300 hover:text-white" />
//                   </span>
//                   <span className="ml-3 text-gray-300 hover:text-white">Sign Out</span>
//                 </button>
//               </>
//             ) : seller ? (
//               <>
//                 <NavLink to="/sellers/all/category" icon={FaBoxOpen} label="Categories" onClick={closeNavbar} />
//                 <NavLink to="/sellers/add/category" icon={FaPlus} label="Add Category" onClick={closeNavbar} />
//                 <NavLink to="/sellers/add/product" icon={FaTags} label="Add Product" onClick={closeNavbar} />
//                 <NavLink to="/profile" icon={FaUserCircle} label="Profile" onClick={closeNavbar} />
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
//                 >
//                   <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-600 transition-colors duration-200">
//                     <FaSignOutAlt className="text-xl text-gray-300 hover:text-white" />
//                   </span>
//                   <span className="ml-3 text-gray-300 hover:text-white">Sign Out</span>
//                 </button>
//               </>
//             ) : null}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { clearToken } from '../../utils/JWT_Token';
import { toast } from 'react-toastify';
import {
  // Search,
  ShoppingBag,
  Menu,
  User,
  LogOut,
  Package,
  Plus,
  Tags,
  ChevronDown,
  X,
} from 'lucide-react';

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-sm tracking-wide hover:text-black/60 transition-colors"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, buyer, seller, setIsAuthenticated } = useAuth();
  const { cartItemCount } = useCart();
  const navbarRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearToken();
    setIsAuthenticated(false);
    toast.success('Logged out successfully!', {
      position: 'top-center',
      autoClose: 2000,
    });
    navigation('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              B2B
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 ">
              {!isAuthenticated ? (
                ['New In', 'Women', 'Men', 'Accessories'].map(item => (
                  <button
                    key={item}
                    className="text-sm tracking-wide hover:text-black/60 transition-colors"
                  >
                    {item}
                  </button>
                ))
              ) : buyer ? (
                <>
                  <NavLink to="/">Shop</NavLink>
                  <NavLink to="/buyers/orders">Orders</NavLink>
                  <NavLink to="/buyers/wishlist">Wishlist</NavLink>
                </>
              ) : (
                seller && (
                  <>
                    <NavLink to="/seller/category/all">Categories</NavLink>
                    {/* <NavLink to="/sellers/all/category">Categories</NavLink> */}
                    {/* <NavLink to="/sellers/add/category">Add Category</NavLink> */}
                    <NavLink to="/seller/all/products">My Products</NavLink>
                    <NavLink to="/sellers/add/product">Add Product</NavLink>
                  </>
                )
              )}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* <Search className="w-5 h-5 text-gray-600 hover:text-black transition-colors cursor-pointer" /> */}

            {isAuthenticated ? (
              <>
                {buyer && (
                  <Link to="/buyers/view/cart" className="relative">
                    <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-black transition-colors cursor-pointer" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                )}

                {/* Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        profileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                       My Profile 
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isAuthenticated ? (
                ['New In', 'Women', 'Men', 'Accessories'].map(item => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                ))
              ) : buyer ? (
                <>
                  <NavLink
                    to="/buyers/products"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </NavLink>
                  <NavLink
                    to="/buyers/orders"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/buyers/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist
                  </NavLink>
                </>
              ) : (
                seller && (
                  <>
                    <NavLink
                      to="/sellers/all/category"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Categories
                    </NavLink>
                    {/* <NavLink
                      to="/sellers/add/category"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Category
                    </NavLink> */}
                    <NavLink
                      to="/sellers/add/product"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Product
                    </NavLink>
                  </>
                )
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
