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
import Clothing from "../pages/Clothing";
import Appliances from "../pages/Appliances";
import ProductDetail from "../pages/ProductDetail";
import MyOrders from "../pages/MyOrders";
import PolicyPage from "../pages/PolicyPage";
import FAQ from "../pages/FAQ";
import ComingSoon from "../pages/ComingSoon";

/**
 * Central route table with all available pages linked.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/appliances" element={<Appliances />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/privacy-policy" element={<PolicyPage policyType="privacy" />} />
      <Route path="/terms-conditions" element={<PolicyPage policyType="terms" />} />
      <Route path="/refund-policy" element={<PolicyPage policyType="refund" />} />
      <Route path="/shipping-policy" element={<PolicyPage policyType="shipping" />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
};

export default AppRoutes;
