import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Clothing from "../pages/Clothing";
import Appliances from "../pages/Appliances";
import ProductDetail from "../pages/ProductDetail";
import MyOrders from "../pages/MyOrders";
import MyAccount from "../pages/MyAccount";
import AdminPanel from "../pages/AdminPanel";
import PolicyPage from "../pages/PolicyPage";
import FAQ from "../pages/FAQ";
import ComingSoon from "../pages/ComingSoon";
import ReviewCard from "../components/common/ReviewCard";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/appliances" element={<Appliances />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/privacy-policy" element={<PolicyPage policyType="privacy" />} />
      <Route path="/terms-conditions" element={<PolicyPage policyType="terms" />} />
      <Route path="/refund-policy" element={<PolicyPage policyType="refund" />} />
      <Route path="/shipping-policy" element={<PolicyPage policyType="shipping" />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="*" element={<ComingSoon />} />

      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
      <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
