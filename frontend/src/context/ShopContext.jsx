
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trendingProducts } from "../data/products";

// Initial data
const INITIAL_WISHLIST = trendingProducts.slice(0, 6);
const INITIAL_CART = trendingProducts.slice(0, 3).map((p) => ({
  ...p,
  qty: 1,
  selectedSize: p.sizes ? p.sizes[2] : null,
  selectedColor: p.colors ? p.colors[0] : null,
}));

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // State
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [cart, setCart] = useState(INITIAL_CART);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");

  // Wishlist functions
  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // Cart functions
  const addToCart = (product, qty = 1, size = null, color = null) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            qty,
            selectedSize: size || (product.sizes ? product.sizes[0] : null),
            selectedColor: color || (product.colors ? product.colors[0] : null),
          },
        ];
      }
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Quick view functions
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Global search function
  const handleGlobalSearch = (searchTerm, category = "all") => {
    setGlobalSearch(searchTerm);
    if (searchTerm.trim()) {
      navigate(`/clothing?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        cart,
        quickViewProduct,
        globalSearch,
        setGlobalSearch,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        addToCart,
        updateCartQty,
        removeFromCart,
        openQuickView,
        closeQuickView,
        handleGlobalSearch,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
