
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { productAPI, userAPI, categoryAPI, orderAPI } from "../services/api";

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
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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
  const [cartNotice, setCartNotice] = useState(null);

  // Fetch products from backend
  const fetchProducts = useCallback(async (filters = {}) => {
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
  }, []);

  // Fetch categories from backend
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  // Fetch wishlist from backend
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await userAPI.getWishlist();
      setWishlist(response.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }, []);

  // Fetch user profile if authenticated
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      setIsAuthenticated(true);
      await fetchWishlist();
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      // Token is expired or invalid — clear it so we don't retry on every load
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [fetchWishlist]);

  // Fetch user orders
  const fetchUserOrders = useCallback(async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }, []);

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
      await fetchWishlist();
      navigate(response.user?.role === "admin" ? "/admin-panel" : "/");
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
      setWishlist([]);
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
    navigate("/login");
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

  // Wishlist functions (synced with backend when logged in)
  const addToWishlist = async (product) => {
    const productId = product.id || product._id;
    const exists = wishlist.find((item) => String(item.id) === String(productId));
    if (exists) return;

    setWishlist((prev) => [...prev, { ...product, id: String(productId) }]);

    if (isAuthenticated) {
      try {
        const res = await userAPI.addToWishlist(productId);
        if (res.wishlist) setWishlist(res.wishlist);
      } catch (err) {
        console.error("Failed to sync wishlist add:", err);
      }
    }
  };

  const removeFromWishlist = async (id) => {
    setWishlist((prev) => prev.filter((p) => String(p.id) !== String(id)));
    if (isAuthenticated) {
      try {
        const res = await userAPI.removeFromWishlist(id);
        if (res.wishlist) setWishlist(res.wishlist);
      } catch (err) {
        console.error("Failed to sync wishlist remove:", err);
      }
    }
  };

  const clearWishlist = async () => {
    setWishlist([]);
    if (isAuthenticated) {
      try {
        await userAPI.clearWishlist();
      } catch (err) {
        console.error("Failed to clear wishlist:", err);
      }
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  // Cart functions
  const addToCart = async (product, qty = 1, size = null, color = null) => {
    const productId = String(product.id || product._id);
    const availableStock = Number(product.stock);
    // Only products with a valid stock value can be added above zero.
    if (!Number.isFinite(availableStock) || availableStock <= 0) {
      setCartNotice({ type: "danger", text: `${product.name} is out of stock.` });
      return { added: false, reason: "out-of-stock" };
    }
    const requestedQty = Math.max(1, Number(qty) || 1);
    setCart((prev) => {
      const exists = prev.find((item) => String(item.id || item._id) === productId);
      if (exists) {
        return prev; // Products can only be added once; quantity is changed in Cart.
      } else {
        return [
          ...prev,
          {
            ...product,
            id: productId,
            stock: availableStock,
            qty: Math.min(requestedQty, availableStock),
            selectedSize: size || (product.sizes ? product.sizes[0] : null),
            selectedColor: color || (product.colors ? product.colors[0] : null),
          },
        ];
      }
    });
    const alreadyAdded = cart.some((item) => String(item.id || item._id) === productId);
    if (alreadyAdded) {
      setCartNotice({ type: "warning", text: `${product.name} is already added to your cart.` });
      return { added: false, reason: "already-added" };
    }
    setCartNotice({ type: "success", text: `${product.name} was added to your cart.` });
    return { added: true };
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        String(item.id || item._id) === String(id)
          ? {
              ...item,
              qty: Math.max(1, Math.min(Number(item.qty || 1) + delta, Number.isFinite(Number(item.stock)) ? Number(item.stock) : Number(item.qty || 1))),
            }
          : item
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
        authLoading,
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
        fetchWishlist,

        // Cart
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        createOrder,
        cartNotice,
        setCartNotice,

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
