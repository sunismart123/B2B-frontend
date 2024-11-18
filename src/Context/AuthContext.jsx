import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, clearToken } from '../utils/JWT_Token'; // Ensure clearToken is imported

// Create AuthContext
export const AuthContext = createContext();

// Create useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buyer, setBuyer] = useState(null);
  const [seller, setSeller] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getToken(); // Use getToken to retrieve the token

      if (token) {
        const buyerDetails = JSON.parse(localStorage.getItem('buyer'));
        const sellerDetails = JSON.parse(localStorage.getItem('seller'));
        const adminDetails = JSON.parse(localStorage.getItem('admin'));

        setBuyer(buyerDetails);
        setSeller(sellerDetails);
        setAdmin(adminDetails);
        setIsAuthenticated(true);
      } else {
        setBuyer(null);
        setSeller(null);
        setAdmin(null);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    localStorage.clear();
    clearToken();
    setBuyer(null);
    setSeller(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const loginBuyer = buyerDetails => {
    localStorage.setItem('buyer', JSON.stringify(buyerDetails));
    setBuyer(buyerDetails);
    setSeller(null);
    setAdmin(null);
  };

  const loginSeller = sellerDetails => {
    localStorage.setItem('seller', JSON.stringify(sellerDetails));
    setSeller(sellerDetails);
    setBuyer(null);
    setAdmin(null);
  };

  const loginAdmin = adminDetails => {
    localStorage.setItem('admin', JSON.stringify(adminDetails));
    setAdmin(adminDetails);
    setBuyer(null);
    setSeller(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        buyer,
        seller,
        admin,
        loginBuyer,
        loginSeller,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
