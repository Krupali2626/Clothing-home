# ⚡ Quick Reference Card

Keep this handy while developing!

---

## 🔑 Test Credentials

```
ADMIN ACCOUNT
Email: admin@dstore.com
Password: admin123

CUSTOMER 1
Email: john@example.com
Password: password123

CUSTOMER 2
Email: jane@example.com
Password: password123
```

---

## 🚀 Commands (Copy & Paste)

### Setup (First Time)

```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd frontend
npm install
```

### Development (Every Time)

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Seed Database (optional - first time or reset)
cd backend
npm run seed

# Terminal 3: Start Frontend
cd frontend
npm start
```

---

## 📍 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React app |
| Backend | http://localhost:5000 | API server |
| API Base | http://localhost:5000/api | All API calls |
| MongoDB | mongodb://localhost:27017 | Local database |

---

## 🔌 Key API Endpoints

### Authentication
```
POST /api/users/register     → Create new user
POST /api/users/login        → Login user
GET /api/users/profile       → Get current user
PUT /api/users/profile       → Update user profile
```

### Products
```
GET /api/products            → List all products
GET /api/products/:id        → Get single product
POST /api/products           → Create product (admin)
PUT /api/products/:id        → Update product (admin)
DELETE /api/products/:id     → Delete product (admin)
```

### Categories
```
GET /api/categories          → List all categories
GET /api/categories/:id      → Get single category
POST /api/categories         → Create category (admin)
PUT /api/categories/:id      → Update category (admin)
DELETE /api/categories/:id   → Delete category (admin)
```

### Orders
```
POST /api/orders             → Create new order
GET /api/orders/my-orders    → Get user's orders
GET /api/orders/:id          → Get order details
GET /api/orders              → Get all orders (admin)
```

### Seed
```
POST /api/seed               → Seed database with test data
```

---

## 📁 File Locations

| File | Purpose | Location |
|------|---------|----------|
| Environment Config (Backend) | `.env` | `backend/.env` |
| Environment Config (Frontend) | `.env.local` | `frontend/.env.local` |
| API Service | Central API client | `frontend/src/services/api.js` |
| Global State | Context provider | `frontend/src/context/ShopContext.jsx` |
| Login Page | Auth example | `frontend/src/pages/Login.jsx` |
| Products Page | Product listing | `frontend/src/pages/Clothing.jsx` |
| Seed Script | Test data | `backend/seed.js` |
| Express Server | Main server file | `backend/index.js` |
| Seed Endpoint | Data generation endpoint | `backend/router/index.js` |

---

## 🛠️ Configuration Templates

### backend/.env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clothing-home
JWT_SECRET=your-secret-key-here-change-this
CLIENT_URL=http://localhost:3000
```

### frontend/.env.local
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Common Tasks

### Add New Product
```
1. Login as admin@dstore.com
2. Go to Admin Panel
3. Click "Add Product"
4. Fill form and submit
   OR
1. Use API: POST /api/products with product data
```

### Create an Order
```javascript
// In component
const { createOrder } = useShop();

await createOrder({
  items: [{ productId, qty }],
  shippingAddress: {...},
  paymentMethod: 'credit_card'
});
```

### Get User Orders
```javascript
// In component
const { fetchUserOrders, userOrders } = useShop();

useEffect(() => {
  fetchUserOrders();
}, []);

// Display userOrders
```

### Filter Products
```javascript
// In component
const { products, fetchProducts } = useShop();

// Filter locally
const filtered = products.filter(p => p.category === categoryId);

// OR fetch with filters
await fetchProducts({ category: categoryId, minPrice: 500, maxPrice: 2000 });
```

---

## 🐛 Debugging Tips

### Frontend Issues
```
1. Check browser console (F12 → Console tab)
2. Check Network tab for API errors
3. Use React DevTools extension
4. Check .env.local has correct API_URL
5. Verify backend is running
```

### Backend Issues
```
1. Check terminal output for errors
2. Verify MongoDB is running
3. Check .env file for all required variables
4. Use MongoDB Compass to inspect data
5. Test endpoints with Postman
```

### Authentication Issues
```
1. Clear localStorage (DevTools → Application → Storage)
2. Verify JWT_SECRET matches in .env
3. Check token in DevTools → Application → localStorage
4. Test login endpoint directly with Postman
```

---

## 📊 Data Schema Quick Reference

### User Schema
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed",
  "phone": "1234567890",
  "role": "customer",
  "avatar": "url",
  "addresses": []
}
```

### Product Schema
```json
{
  "name": "Product Name",
  "description": "Description",
  "category": "ObjectId",
  "price": 999,
  "discountPrice": 599,
  "stock": 50,
  "images": ["url1", "url2"],
  "rating": 4.5,
  "numReviews": 24
}
```

### Order Schema
```json
{
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "name": "Product",
      "price": 599,
      "qty": 2
    }
  ],
  "totalPrice": 1198,
  "shippingAddress": {},
  "status": "processing"
}
```

---

## 📱 Frontend Navigation

```
Home
├── Navbar (Header)
│   ├── Logo
│   ├── Search
│   ├── Cart icon
│   ├── Wishlist icon
│   └── User menu
├── Featured Products
├── Categories
├── Flash Sale
└── Footer

Clothing (Products)
├── Filters (Category, Price, Rating)
├── Search
├── Sort (Featured, Newest, Price, Rating)
└── Product Grid (20 items)

Product Detail
├── Image gallery
├── Product info
├── Ratings & reviews
├── Add to cart / Wishlist
└── Related products

Cart
├── Cart items
├── Cart totals
└── Checkout button

Login/Register
├── Email/Password form
└── Register link / Login link

My Account
├── Profile info
├── Addresses
└── Preferences

My Orders
├── Order list
├── Order status
└── Order details
```

---

## 🚨 Emergency Fixes

### Port 5000 Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Clear Database and Reseed
```bash
# Stop backend (Ctrl+C)
# Then:
cd backend
npm run seed
```

### Clear Frontend Cache
```bash
# In browser DevTools
Applications → Cache Storage → Delete all
Applications → Local Storage → Clear all
```

### Reinstall Dependencies
```bash
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Pre-Development Checklist

- [ ] MongoDB running
- [ ] Backend `.env` configured
- [ ] Frontend `.env.local` configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend started (`npm run dev`)
- [ ] Frontend started (`npm start`)
- [ ] Can login with test credentials
- [ ] Products visible on Clothing page
- [ ] Categories visible on Home page

---

## 📚 Documentation

For detailed information, see:
- **Setup & Seeding:** [SEED_DATA_GUIDE.md](./SEED_DATA_GUIDE.md)
- **Full Integration:** [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)
- **Code Comments:** Check inline comments in all files

---

## 🎯 Most Used Commands

```bash
# Start everything (3 terminals)
npm run dev          # Terminal 1: Backend
npm run seed         # Terminal 2: Seed (optional)
npm start            # Terminal 3: Frontend

# Test specific endpoint
curl -X POST http://localhost:5000/api/seed

# View database
mongosh
use clothing-home
db.products.find()
```

---

## How to Connect Other Pages

### Template for Product Listing Pages (Appliances, etc.)

Use `Clothing.jsx` as your template. Just change:

```javascript
// Change this line:
const clothingCats = categories.filter((c) => c.type === "clothing");
// To:
const applianceCats = categories.filter((c) => c.type === "appliance");

// And this in fetchProducts():
fetchProducts({ category: "appliance" });
```

### Template for Pages Using User Data

#### Example: MyAccount.jsx
```javascript
import { useShop } from "../context/ShopContext";

function MyAccount() {
  const { user, isAuthenticated, updateProfile, loading } = useShop();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = async (data) => {
    try {
      await updateProfile(data);
      alert("Profile updated!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <>
          <h1>Welcome, {user.name}!</h1>
          {/* Show user data and edit form */}
        </>
      )}
    </div>
  );
}
```

---

**Bookmark this page for quick access while developing! 🚀**


## Template for Pages Using Orders

### Example: MyOrders.jsx
```javascript
import { useEffect } from "react";
import { useShop } from "../context/ShopContext";

function MyOrders() {
  const { orders, isAuthenticated, fetchUserOrders, loading } = useShop();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>My Orders</h1>
      {loading ? <p>Loading orders...</p> : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Order #{order._id} - {order.status}
              Total: ₹{order.totalPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Direct API Usage Example

### Example: ProductDetail.jsx
```javascript
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.salePrice}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

## Form Submission Example

### Example: Contact.jsx
```javascript
import { useState } from "react";
import { contactAPI } from "../services/api";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.sendMessage(form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
      <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
      <button type="submit">Send</button>
      {submitted && <p>Thanks for contacting us!</p>}
    </form>
  );
}
```

## Common Patterns

### 1. Fetch Data on Mount
```javascript
useEffect(() => {
  fetchSomething();
}, []); // Empty dependency array = fetch once on mount
```

### 2. Fetch with Parameters
```javascript
useEffect(() => {
  fetchProducts({ category: "clothing", sort: "newest" });
}, [selectedCategory, sortOrder]); // Re-fetch when these change
```

### 3. Error & Loading States
```javascript
const { data, loading, error } = useShop();

if (loading) return <Spinner />;
if (error) return <Alert>{error}</Alert>;
if (!data) return <p>No data</p>;

return <YourComponent data={data} />;
```

### 4. Protected Pages
```javascript
import { Navigate } from "react-router-dom";

function ProtectedPage() {
  const { isAuthenticated } = useShop();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <YourContent />;
}
```

## Adding New API Endpoints

Edit `frontend/src/services/api.js`:

```javascript
// Add new resource
export const contactAPI = {
  sendMessage: (data) =>
    apiCall("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getMessages: () => apiCall("/contact"), // admin
};
```

Then use in components:
```javascript
import { contactAPI } from "../services/api";

const response = await contactAPI.sendMessage({ name, email, message });
```

## Testing Your Integration

1. **Open DevTools** (F12) → Network tab
2. **Perform action** (login, search products, etc.)
3. **Check requests** - Should see API calls to `http://localhost:5000/api`
4. **Check responses** - Should have data and success status
5. **Check errors** - 401 means token issue, 404 means wrong endpoint

## Quick Checklist for New Pages

- [ ] Import `useShop` from context
- [ ] Add `useEffect` to fetch data
- [ ] Add loading state check
- [ ] Add error handling
- [ ] Add authentication check if needed
- [ ] Test API calls in Network tab
- [ ] Verify data displays correctly

---

Follow these patterns and your integration will be smooth!
