import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { clearToken } from '../../utils/JWT_Token';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const adminDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = dropdown => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearToken();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleClickOutside = event => {
    if (
      adminDropdownRef.current &&
      !adminDropdownRef.current.contains(event.target) &&
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-16 flex justify-between items-center bg-gray-800 p-4">
      <div
        className={`flex flex-col md:flex-row md:items-center ${
          isOpen ? 'block' : 'hidden'
        } md:flex md:space-x-6 absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-gray-800 md:bg-transparent text-center md:text-left`}
      >
        <Link
          to="/sign-up"
          className="text-white text-lg flex items-center gap-2 px-4 py-2 md:p-0 hover:text-red-400"
        >
          Add Buyer & Seller
        </Link>
        <Link
          to="/sellers/all/category"
          className="text-white text-lg flex items-center gap-2 px-4 py-2 md:p-0 hover:text-red-400"
        >
          All Category
        </Link>
        <Link
          to="/admin/view/products"
          className="text-white text-lg flex items-center gap-2 px-4 py-2 md:p-0 hover:text-red-400"
        >
          All Products
        </Link>
        <Link
          to="/admin-dashboard"
          className="text-white text-lg flex items-center gap-2 px-4 py-2 md:p-0 hover:text-red-400"
        >
          All Orders
        </Link>
        <div className="relative" ref={adminDropdownRef}>
          <button
            onClick={() => toggleDropdown('admin')}
            className="flex items-center text-white text-lg px-4 py-2 md:p-0 hover:text-red-400 focus:outline-none"
          >
            Dashboard <FaCaretDown className="ml-1" />
          </button>
          {openDropdown === 'admin' && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
              <Link
                to="/admin/all/buyers"
                className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400"
              >
                All Buyer
              </Link>
              <Link
                to="/admin/all/sellers"
                className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400"
              >
                All Seller
              </Link>
              {/* <Link to="/admin/active/buyers" className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400">
                Active Buyer
              </Link>
              <Link to="/admin/active/sellers" className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400 ">
                Active Seller
              </Link> */}
            </div>
          )}
        </div>
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => toggleDropdown('profile')}
            className="flex items-center text-white text-lg px-4 py-2 md:p-0 hover:text-red-400 focus:outline-none"
          >
            <FaUserCircle className="text-2xl mr-2" />{' '}
            {user?.firstName || 'Admin'} <FaCaretDown className="ml-1" />
          </button>
          {openDropdown === 'profile' && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400"
              >
                <FaUserCircle className="inline mr-2" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 hover:text-red-400 focus:outline-none"
              >
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
