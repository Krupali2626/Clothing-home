// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add token if exists
  const token = localStorage.getItem("authToken");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // For cookies
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
    let query = "";
    if (filters.search) query += `?search=${filters.search}`;
    if (filters.category) query += `${query ? "&" : "?"}category=${filters.category}`;
    if (filters.sort) query += `${query ? "&" : "?"}sort=${filters.sort}`;
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
  getAllUsers: () => apiCall("/users"),
  getUserById: (id) => apiCall(`/users/${id}`),
  updateUser: (id, data) =>
    apiCall(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    apiCall(`/users/${id}`, {
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
  getAllOrders: () => apiCall("/orders"),
  updateOrderStatus: (id, status) =>
    apiCall(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  deleteOrder: (id) =>
    apiCall(`/orders/${id}`, {
      method: "DELETE",
    }),
};

// Advertisement APIs
export const advertisementAPI = {
  getAllAdvertisements: () => apiCall("/advertisements"),
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
  advertisementAPI,
  seedAPI,
};
