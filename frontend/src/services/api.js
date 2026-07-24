// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("authToken");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Product APIs
export const productAPI = {
  getAllProducts: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, value);
    });
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiCall(`/products${query}`);
  },
  getProductById: (id) => apiCall(`/products/${id}`),
  createProduct: (data) =>
    apiCall("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProduct: (id, data) =>
    apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProduct: (id) =>
    apiCall(`/products/${id}`, {
      method: "DELETE",
    }),
  addReview: (id, review) =>
    apiCall(`/products/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    }),
};

// User APIs
export const userAPI = {
  register: (userData) =>
    apiCall("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  login: (credentials) =>
    apiCall("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  getProfile: () => apiCall("/users/profile"),
  updateProfile: (data) =>
    apiCall("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  changePassword: (data) =>
    apiCall("/users/changepassword", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getAllUsers: () => apiCall("/users"),
  getUserById: (id) => apiCall(`/users/${id}`),
  createUser: (data) =>
    apiCall("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateUser: (id, data) =>
    apiCall(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    apiCall(`/users/${id}`, {
      method: "DELETE",
    }),
  // Addresses
  getAddresses: () => apiCall("/users/profile"),
  addAddress: (data) =>
    apiCall("/users/addresses", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateAddress: (addressId, data) =>
    apiCall(`/users/addresses/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAddress: (addressId) =>
    apiCall(`/users/addresses/${addressId}`, {
      method: "DELETE",
    }),
  setDefaultAddress: (addressId) =>
    apiCall(`/users/addresses/${addressId}/default`, {
      method: "PUT",
    }),
  // Payment Methods
  addPaymentMethod: (data) =>
    apiCall("/users/payment-methods", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deletePaymentMethod: (paymentId) =>
    apiCall(`/users/payment-methods/${paymentId}`, {
      method: "DELETE",
    }),
  // Wishlist
  getWishlist: () => apiCall("/users/wishlist"),
  addToWishlist: (productId) =>
    apiCall(`/users/wishlist/${productId}`, {
      method: "POST",
    }),
  removeFromWishlist: (productId) =>
    apiCall(`/users/wishlist/${productId}`, {
      method: "DELETE",
    }),
  clearWishlist: () =>
    apiCall("/users/wishlist", {
      method: "DELETE",
    }),
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};

// Category APIs
export const categoryAPI = {
  getAllCategories: () => apiCall("/categories"),
  getCategoryById: (id) => apiCall(`/categories/${id}`),
  createCategory: (data) =>
    apiCall("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCategory: (id, data) =>
    apiCall(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCategory: (id) =>
    apiCall(`/categories/${id}`, {
      method: "DELETE",
    }),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData) =>
    apiCall("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),
  getMyOrders: () => apiCall("/orders/myorders"),
  getOrderById: (id) => apiCall(`/orders/${id}`),
  getAllOrders: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== "all") {
        params.append(key, value);
      }
    });
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiCall(`/orders${query}`);
  },
  updateOrderStatus: (id, status, extra = {}) =>
    apiCall(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status, ...extra }),
    }),
  cancelOrder: (id, note = "") =>
    apiCall(`/orders/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify({ note }),
    }),
  deleteOrder: (id) =>
    apiCall(`/orders/${id}`, {
      method: "DELETE",
    }),
};

// Stats APIs (admin)
export const statsAPI = {
  getStats: () => apiCall("/stats"),
};

// Settings APIs (admin)
export const settingsAPI = {
  getSettings: () => apiCall("/settings"),
  updateSettings: (data) =>
    apiCall("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Advertisement APIs
export const advertisementAPI = {
  getActiveAdvertisements: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiCall(`/advertisements${query}`);
  },
  getAllAdvertisements: () => apiCall("/advertisements/all"),
  getAdvertisementById: (id) => apiCall(`/advertisements/${id}`),
  createAdvertisement: (data) =>
    apiCall("/advertisements", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateAdvertisement: (id, data) =>
    apiCall(`/advertisements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAdvertisement: (id) =>
    apiCall(`/advertisements/${id}`, {
      method: "DELETE",
    }),
};

// Seed API
export const seedAPI = {
  seedDatabase: () =>
    apiCall("/seed", {
      method: "POST",
    }),
};

export default {
  productAPI,
  userAPI,
  categoryAPI,
  orderAPI,
  statsAPI,
  settingsAPI,
  advertisementAPI,
  seedAPI,
};
