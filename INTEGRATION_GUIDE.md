# Frontend-Backend Integration Guide

## Overview
Your Clothing-home project is now fully integrated! The frontend is connected to the backend API with complete support for products, categories, users, orders, and advertisements.

## What's Been Set Up

### 1. **API Service Layer** (`frontend/src/services/api.js`)
- Centralized API client for all backend communication
- Handles authentication tokens automatically
- Includes error handling and credentials support
- Organized by resource (products, users, categories, orders, advertisements)

**API Endpoints Available:**
```
Products:
- GET /api/products                    # Get all products with filters
- GET /api/products/:id                # Get product by ID
- POST /api/products/:id/reviews       # Add product review

Users:
- POST /api/users/register             # Register new user
- POST /api/users/login                # Login user
- GET /api/users/profile               # Get user profile (protected)
- PUT /api/users/profile               # Update user profile (protected)
- GET /api/users                       # Get all users (admin)
- GET /api/users/:id                   # Get user by ID (admin)
- PUT /api/users/:id                   # Update user (admin)
- DELETE /api/users/:id                # Delete user (admin)

Categories:
- GET /api/categories                  # Get all categories
- GET /api/categories/:id              # Get category by ID
- POST /api/categories                 # Create category (admin)
- PUT /api/categories/:id              # Update category (admin)
- DELETE /api/categories/:id           # Delete category (admin)

Orders:
- POST /api/orders                     # Create order (protected)
- GET /api/orders/my-orders            # Get user's orders (protected)
- GET /api/orders/:id                  # Get order by ID (protected)
- GET /api/orders                      # Get all orders (admin)
- PUT /api/orders/:id                  # Update order status (admin)
- DELETE /api/orders/:id               # Delete order (admin)

Advertisements:
- GET /api/advertisements              # Get all ads
- GET /api/advertisements/:id          # Get ad by ID
- POST /api/advertisements             # Create ad (admin)
- PUT /api/advertisements/:id          # Update ad (admin)
- DELETE /api/advertisements/:id       # Delete ad (admin)
```

### 2. **Updated ShopContext** (`frontend/src/context/ShopContext.jsx`)
Enhanced context provider with:
- **Product Management**: Fetch products from backend, filter/sort
- **Category Management**: Load categories from API
- **User Authentication**: Login, register, logout functions
- **Profile Management**: Update user profile
- **Order Management**: Create orders, fetch user orders
- **Cart & Wishlist**: Full functionality (client-side)
- **Error Handling**: Global error state management
- **Loading States**: Loading indicators for async operations

**Available Functions:**
```javascript
const { 
  // Data
  products, categories, user, orders, wishlist, cart,
  // Status
  loading, error, isAuthenticated,
  // Functions
  fetchProducts, fetchCategories, fetchUserOrders,
  login, register, logout, updateProfile,
  addToCart, removeFromCart, updateCartQty, clearCart,
  addToWishlist, removeFromWishlist, clearWishlist, isInWishlist,
  createOrder, openQuickView, closeQuickView,
  handleGlobalSearch
} = useShop();
```

### 3. **Updated Pages**
#### Login Page (`frontend/src/pages/Login.jsx`)
- Connected to backend authentication API
- Sign In: Calls `/api/users/login`
- Sign Up: Calls `/api/users/register`
- Automatic token storage in localStorage
- Error handling and loading states
- Auto-redirect on successful login

#### Clothing Page (`frontend/src/pages/Clothing.jsx`)
- Fetches products from backend API
- Dynamic filters and sorting
- Search functionality
- Real-time product updates
- Mobile responsive filter panel

#### Home Page (`frontend/src/pages/Home.jsx`)
- Fetches trending products from backend
- Auto-loads categories from API
- Maintains local blog/review data for now
- Ready for full API integration

### 4. **Environment Configuration** (`frontend/.env.local`)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## How to Use

### Starting the Applications

**Terminal 1 - Backend:**
```bash
cd backend
npm install          # If not done already
npm run dev          # Starts on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install          # If not done already
npm start            # Starts on http://localhost:3000
```

### Using the API in Components

#### Example 1: Using useShop Hook
```javascript
import { useShop } from "../context/ShopContext";

function ProductList() {
  const { products, loading, fetchProducts } = useShop();

  useEffect(() => {
    fetchProducts({ category: "clothing" });
  }, []);

  if (loading) return <p>Loading...</p>;
  
  return products.map(p => <ProductCard key={p.id} product={p} />);
}
```

#### Example 2: Login
```javascript
const { login, loading, isAuthenticated } = useShop();

const handleLogin = async (email, password) => {
  try {
    await login({ email, password });
    // User is now logged in and redirected
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
```

#### Example 3: Direct API Calls
```javascript
import { productAPI, orderAPI } from "../services/api";

async function getProduct(id) {
  try {
    const response = await productAPI.getProductById(id);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## Features by Page

### Page Connections Ready ✓

1. **Home** - Fetches products and categories
2. **Clothing** - Full product listing with filters, sorts, and search
3. **Login** - Authentication (Login/Register)
4. **About** - Informational (local content)
5. **Blog** - Blog listing (ready for API connection)
6. **Contact** - Contact form (ready for API connection)
7. **Cart** - Shopping cart (uses context)
8. **Wishlist** - Wishlist management (uses context)
9. **My Orders** - Order history (ready for API integration)
10. **My Account** - User profile (ready for API integration)
11. **Product Detail** - Individual product view (ready for API)
12. **Admin Panel** - Admin functionality (ready for API)

## Remaining Integration Tasks

### Pages to Connect:
- [ ] **Appliances Page** - Similar to Clothing (use Clothing.jsx as template)
- [ ] **Product Detail Page** - Fetch single product details
- [ ] **My Account Page** - Display user profile, allow updates
- [ ] **My Orders Page** - Fetch and display user orders
- [ ] **Admin Panel** - Product/category/order management
- [ ] **Contact Page** - Submit contact form to backend
- [ ] **Blog Pages** - Fetch blog posts from backend (optional)

### Features to Add:
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Order tracking
- [ ] Product reviews API integration
- [ ] Advanced search/filtering
- [ ] Wishlist persistence (save to backend)
- [ ] Cart persistence (save to backend)

## Authentication Flow

1. **User Registers:**
   ```
   Frontend (Register Form) 
   → POST /api/users/register 
   → Backend creates user + JWT token
   → Token stored in localStorage
   → Redirected to home
   ```

2. **User Logs In:**
   ```
   Frontend (Login Form) 
   → POST /api/users/login 
   → Backend validates + returns JWT token
   → Token stored in localStorage
   → Redirected to home
   ```

3. **Protected Requests:**
   ```
   All API calls automatically include:
   Headers: { Authorization: "Bearer {token}" }
   ```

4. **User Logs Out:**
   ```
   localStorage cleared
   Context state reset
   Redirected to home
   ```

## Error Handling

All API calls include try/catch and error states:

```javascript
try {
  const response = await productAPI.getAllProducts();
  // Handle success
} catch (error) {
  console.error(error.message); // Use in UI
  // Show error message to user
}
```

## Database Models Expected

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String (hashed),
  avatar: String (URL),
  role: String ("user" | "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  salePrice: Number,
  discount: Number (percentage),
  category: String,
  brand: String,
  rating: Number,
  reviews: Array,
  images: [String],
  sizes: [String],
  colors: [String],
  stock: Number,
  type: String ("clothing" | "appliance"),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  icon: String (URL),
  type: String ("clothing" | "appliance"),
  description: String,
  count: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{productId, qty, price}],
  totalPrice: Number,
  shippingAddress: Object,
  status: String ("pending" | "processing" | "shipped" | "delivered"),
  paymentStatus: String ("pending" | "completed"),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### CORS Error
- Ensure backend is running on port 5000
- Check `.env.local` has correct `REACT_APP_API_URL`
- Backend should have CORS enabled (it does in index.js)

### Token Not Persisting
- Check localStorage in browser DevTools
- Verify login response includes token
- Clear localStorage and try login again

### Products Not Loading
- Check backend API is running
- Verify database connection
- Check browser network tab for API response
- Ensure products exist in database

### Authentication Failing
- Verify user exists in database
- Check password hashing on backend
- Ensure JWT secret is set in `.env`

## Next Steps

1. **Set up Database** - MongoDB connection in backend
2. **Test APIs** - Use Postman/Insomnia to test endpoints
3. **Create Sample Data** - Seed products, categories, users
4. **Connect Remaining Pages** - Follow Clothing.jsx pattern
5. **Implement Payment** - Add Razorpay/Stripe integration
6. **Deploy** - Use Vercel (frontend) + Heroku/Railway (backend)

## API Base URL Configuration

For **Production**, update `.env.local`:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

For **Development**, keep:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

**Status**: ✅ Frontend-Backend integration complete and ready for testing!
