import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import { getToken } from '../utils/JWT_Token';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [cartAmount, setCartAmount] = useState('0.0');
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const userId = JSON.parse(localStorage.getItem('buyer'))?.id;
  console.log(cartItemCount + 'UserId');
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('Authentication token not found.');

      const response = await axios.get(
        `${config.apiUrl}/B2B/cart/fetchUserCart?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const allCart = response.data;
      if (allCart) {
        setCarts(allCart.carts || []);
        setCartAmount(allCart.totalCartAmount || '0.0');
        setCartItemCount(allCart.carts?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Only show error toast if there's a real error, not just empty cart
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch cart. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateCart = useCallback(
    async (cart, increment = true) => {
      const token = getToken();
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }

      const newQuantity = increment
        ? cart.quantity + 1
        : Math.max(1, cart.quantity - 1);

      try {
        const response = await axios({
          method: 'PUT',
          url: `${config.apiUrl}/B2B/cart/updateCart`,
          data: { id: cart.id, userId, quantity: newQuantity },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.success(response.data.responseMessage);
          await fetchCart(); // This will update all cart state at once
        } else {
          toast.error(response.data.responseMessage);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        toast.error('Failed to update cart. Please try again.');
      }
    },
    [userId, fetchCart],
  );

  const deleteCart = useCallback(
    async cartId => {
      const token = getToken();
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }

      try {
        const response = await axios({
          method: 'DELETE',
          url: `${config.apiUrl}/B2B/cart/deleteCart`,
          data: { id: cartId, userId },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.success(response.data.responseMessage);
          // Update local state first for immediate feedback
          setCarts(prevCarts => {
            const newCarts = prevCarts.filter(cart => cart.id !== cartId);
            setCartItemCount(newCarts.length);
            return newCarts;
          });
          setCartAmount(response.data.totalCartAmount || '0.0');
          await fetchCart();
        } else {
          toast.error(response.data.responseMessage);
        }
      } catch (error) {
        console.error('Error deleting cart item:', error);
        toast.error('Failed to delete cart item. Please try again.');
      }
    },
    [userId, fetchCart],
  );

  // Remove the separate updateCartCount function since we handle count in fetchCart

  const value = {
    carts,
    cartAmount,
    cartItemCount,
    loading,
    fetchCart,
    updateCart,
    deleteCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import config from '../config';
// import { getToken } from '../utils/JWT_Token';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [carts, setCarts] = useState([]);
//   const [cartAmount, setCartAmount] = useState('0.0');
//   const [loading, setLoading] = useState(true);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [userId, setUserId] = useState(null);
//   const [initialized, setInitialized] = useState(false);

//   // Initialize userId from localStorage
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'buyer') {
//         const newBuyerData = e.newValue ? JSON.parse(e.newValue) : null;
//         setUserId(newBuyerData?.id || null);
//       }
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   useEffect(() => {
//     const initializeCart = async () => {
//       try {
//         const buyerData = localStorage.getItem('buyer');
//         const token = getToken();

//         if (buyerData && token) {
//           const buyer = JSON.parse(buyerData);
//           setUserId(buyer.id);
//         } else {
//           // Clear cart state if no valid session exists
//           setCarts([]);
//           setCartAmount('0.0');
//           setCartItemCount(0);
//           setUserId(null);
//         }
//       } catch (error) {
//         console.error('Error initializing cart:', error);
//         // Handle invalid stored data
//         localStorage.removeItem('buyer');
//         setUserId(null);
//       } finally {
//         setInitialized(true);
//       }
//     };

//     initializeCart();
//   }, []);
//   useEffect(() => {
//     if (initialized && userId) {
//       fetchCart();
//     }
//   }, [initialized, userId]);

//   const fetchCart = useCallback(async () => {
//     if (!userId) return;

//     setLoading(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error('Authentication token not found.');
//       }

//       const response = await axios.get(
//         `${config.apiUrl}/B2B/cart/fetchUserCart?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           // Add error handling for network timeouts
//           timeout: 5000
//         }
//       );

//       const allCart = response.data;
//       if (allCart) {
//         setCarts(allCart.carts || []);
//         setCartAmount(allCart.totalCartAmount || '0.0');
//         setCartItemCount(allCart.carts?.length || 0);
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);

//       // Handle specific error cases
//       if (error.response?.status === 401) {
//         // Token expired or invalid
//         localStorage.removeItem('buyer');
//         setUserId(null);
//         toast.error('Session expired. Please login again.');
//       } else if (error.response?.status !== 404) {
//         toast.error('Failed to fetch cart. Please try again.');
//       }

//       // Reset cart state on error
//       setCarts([]);
//       setCartAmount('0.0');
//       setCartItemCount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   const updateCart = useCallback(
//     async (cart, increment = true) => {
//       if (!userId) {
//         toast.error('Please login to update cart.');
//         return;
//       }

//       const token = getToken();
//       if (!token) {
//         toast.error('Authentication token not found. Please login again.');
//         return;
//       }

//       const newQuantity = increment
//         ? cart.quantity + 1
//         : Math.max(1, cart.quantity - 1);

//       try {
//         const response = await axios({
//           method: 'PUT',
//           url: `${config.apiUrl}/B2B/cart/updateCart`,
//           data: { id: cart.id, userId, quantity: newQuantity },
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           toast.success(response.data.responseMessage);
//           await fetchCart();
//         } else {
//           toast.error(response.data.responseMessage);
//         }
//       } catch (error) {
//         console.error('Error updating cart:', error);
//         toast.error('Failed to update cart. Please try again.');
//       }
//     },
//     [userId, fetchCart]
//   );

//   const deleteCart = useCallback(
//     async cartId => {
//       if (!userId) {
//         toast.error('Please login to delete cart items.');
//         return;
//       }

//       const token = getToken();
//       if (!token) {
//         toast.error('Authentication token not found. Please login again.');
//         return;
//       }

//       try {
//         const response = await axios({
//           method: 'DELETE',
//           url: `${config.apiUrl}/B2B/cart/deleteCart`,
//           data: { id: cartId, userId },
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           toast.success(response.data.responseMessage);
//           // Update local state first for immediate feedback
//           setCarts(prevCarts => {
//             const newCarts = prevCarts.filter(cart => cart.id !== cartId);
//             setCartItemCount(newCarts.length);
//             return newCarts;
//           });
//           setCartAmount(response.data.totalCartAmount || '0.0');
//           await fetchCart();
//         } else {
//           toast.error(response.data.responseMessage);
//         }
//       } catch (error) {
//         console.error('Error deleting cart item:', error);
//         toast.error('Failed to delete cart item. Please try again.');
//       }
//     },
//     [userId, fetchCart]
//   );

//   const value = {
//     carts,
//     cartAmount,
//     cartItemCount,
//     loading,
//     fetchCart,
//     updateCart,
//     deleteCart,
//   };
//   if (!initialized) {
//     return null; // Or return a loading spinner
//   }

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
