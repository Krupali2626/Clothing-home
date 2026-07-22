
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productAPI, userAPI, categoryAPI, orderAPI } from "../services/api";
import { trendingProducts } from "../data/products";

// Initial data fallback
const INITIAL_WISHLIST = trendingProducts.slice(0, 6);
const INITIAL_CART = [];

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const navigate = useNavigate();
   
  // State - Products & Categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   
  // State - Cart & Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
   
  // State - User & Auth
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("authToken"));
  const [authLoading, setAuthLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Fetch products from backend
  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAllProducts(filters);
      setProducts(response.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Fetch user profile if authenticated
  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Initialize on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserProfile().finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  // User Authentication Functions
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await userAPI.login(credentials);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);
      navigate("/");
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await userAPI.register(userData);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);
      navigate("/");
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    userAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    navigate("/");
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await userAPI.updateProfile(profileData);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
  const addToCart = async (product, qty = 1, size = null, color = null) => {
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

  const clearCart = () => {
    setCart([]);
  };

  // Order functions
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const response = await orderAPI.createOrder(orderData);
      await fetchUserOrders();
      clearCart();
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
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

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }
    return true;
  };

  return (
    <ShopContext.Provider
      value={{
        // Products & Categories
        products,
        categories,
        loading,
        error,
        fetchProducts,
        fetchCategories,
        
        // User & Auth
        user,
        isAuthenticated,
        orders,
        login,
        register,
        logout,
        updateProfile,
        fetchUserOrders,
        requireAuth,
        
        // Wishlist
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        
        // Cart
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        createOrder,
        
        // Quick View & Search
        quickViewProduct,
        globalSearch,
        setGlobalSearch,
        openQuickView,
        closeQuickView,
        handleGlobalSearch,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
