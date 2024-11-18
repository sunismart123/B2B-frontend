import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navigation/Navbar';
import Signin from './component/Register/Signin';
// import Signup from './component/Register/Signup';
import Home from './Pages/Home';
import Forgotpassword from './component/Register/Forgotpassword';
import { AuthProvider, useAuth } from './Context/AuthContext';
import ChangePassword from './component/Register/ChangePassword';
import Profile from './component/Register/Profile';
import AdminNavbar from './component/Navigation/AdminNavbar';
import SellerNavbar from './component/Navigation/SellerNavbar';
import BuyerNavbar from './component/Navigation/BuyerNavabar';
import GetAllBuyers from './component/Admin/GetallBuyers';
import GetAllSeller from './component/Admin/GetAllSeller';
import ActiveBuyers from './component/Admin/ActiveBuyers';
import ActiveSellers from './component/Admin/ActiveSellers';
import AddProduct from './component/Product/AddProduct';
import AddCategory from './component/Category/AddCategory';
import GetCategory from './component/Category/GetCategory';
import ViewMyCart from './component/cart/ViewMyCart';
import OrderProduct from './component/Order/OrderProduct';
import Payment from './component/Order/Payment';
import ViewAllProducts from './component/Admin/ViewAllProducts';
import BuyerCheckout from './component/Order/BuyerCheckout';
import BuyerOrdes from './component/Order/BuyerOrdes';
import MobileLogin from './component/Register/MobileLogin';

import ProductDetail from './component/Product/ProductDetails';
import Signup from './component/Register/SignupComponet/Signup';
import CategoryManagement from './component/Category/CategoryManagement';
import SellerProducts from './component/Product/SellerProducts';

const App = () => {
  const { isAuthenticated } = useAuth(); // Use useAuth to get authentication status
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/user/forgot" element={<Forgotpassword />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-navbar" element={<AdminNavbar />} />
        <Route path="/seller-navbar" element={<SellerNavbar />} />
        <Route path="/buyer-navbar" element={<BuyerNavbar />} />
        <Route path="/admin/all/buyers" element={<GetAllBuyers />} />
        <Route path="/admin/all/sellers" element={<GetAllSeller />} />
        <Route path="/admin/active/buyers" element={<ActiveBuyers />} />
        <Route path="/admin/active/sellers" element={<ActiveSellers />} />
        <Route path="/sellers/add/product" element={<AddProduct />} />
        <Route path="/sellers/add/category" element={<AddCategory />} />
        <Route path="/sellers/all/category" element={<GetCategory />} />
        <Route path="/buyers/view/cart" element={<ViewMyCart />} />
        <Route path="/buyer/order" element={<OrderProduct />} />
        <Route path="/order/payment" element={<Payment />} />
        <Route path="/admin/view/products" element={<ViewAllProducts />} />
        <Route path="/cart/checkout" element={<BuyerCheckout />} />
        <Route path="/buyers/orders" element={<BuyerOrdes />} />
        <Route path="/users/login/mobile" element={<MobileLogin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/seller/category/all" element={<CategoryManagement />} />
        <Route path="/seller/all/products" element={<SellerProducts />} />
      </Routes>
      {/* {isAuthenticated && <Footer />} */}
    </Router>
  );
};

export default App;
