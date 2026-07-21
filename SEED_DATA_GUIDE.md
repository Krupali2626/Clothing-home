# 🌱 Database Seeding Guide

Complete guide to seed your database with sample data and start testing the application immediately.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Seeding Options](#seeding-options)
4. [Test Credentials](#test-credentials)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ **Required:**
- Node.js installed
- MongoDB connection working
- Backend dependencies installed (`npm install`)

---

## Environment Setup

### 1️⃣ Configure Backend `.env`

Edit `backend/.env` with your MongoDB credentials:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clothing-home
JWT_SECRET=your-secret-key-here-change-this
CLIENT_URL=http://localhost:3000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clothing-home
```

### 2️⃣ Configure Frontend `.env.local`

Edit `frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Seeding Options

### Option 1: CLI Command (Recommended)

```bash
# Navigate to backend folder
cd backend

# Run seed script
npm run seed
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Created 3 users
✅ Created 10 categories
✅ Created 20 products
✅ Created 3 sample orders

✨ Database seeded successfully!

📝 Test Credentials:
Admin - Email: admin@dstore.com | Password: admin123
User - Email: john@example.com | Password: password123
User - Email: jane@example.com | Password: password123

🔌 Database connection closed
```

### Option 2: API Endpoint (Via Frontend)

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Call seed endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/seed
   ```

3. **Response:**
   ```json
   {
     "success": true,
     "message": "✅ Database seeded successfully!",
     "data": {
       "users": 3,
       "categories": 10,
       "products": 10,
       "credentials": [
         {"email": "admin@dstore.com", "password": "admin123", "role": "admin"},
         {"email": "john@example.com", "password": "password123", "role": "customer"},
         {"email": "jane@example.com", "password": "password123", "role": "customer"}
       ]
     }
   }
   ```

---

## Test Credentials

### Admin Account
- **Email:** `admin@dstore.com`
- **Password:** `admin123`
- **Role:** Administrator
- **Access:** Dashboard, Product Management, Order Management

### Customer Accounts

#### Customer 1
- **Email:** `john@example.com`
- **Password:** `password123`
- **Status:** Active with order history

#### Customer 2
- **Email:** `jane@example.com`
- **Password:** `password123`
- **Status:** Active

---

## Sample Data Overview

### Users (3)
| Email | Password | Role |
|-------|----------|------|
| admin@dstore.com | admin123 | Admin |
| john@example.com | password123 | Customer |
| jane@example.com | password123 | Customer |

### Categories (10)

**Clothing (6):**
- T-Shirts
- Shirts
- Jeans
- Dresses
- Shorts
- Jackets

**Appliances (4):**
- Kitchen Appliances
- Washing Machines
- Refrigerators
- Air Conditioners

### Products (20)

**Clothing Items (6):**
1. Classic Blue T-Shirt - ₹399 (from ₹599)
2. White Graphic T-Shirt - ₹499 (from ₹699)
3. Formal White Shirt - ₹899 (from ₹1299)
4. Slim Fit Blue Jeans - ₹999 (from ₹1499)
5. Elegant Black Evening Dress - ₹1699 (from ₹2499)
6. Colorful Floral Summer Dress - ₹799 (from ₹1299)

**Appliance Items (10):**
1. Stainless Steel Blender - ₹2299 (from ₹3499)
2. Electric Kettle - ₹799 (from ₹1299)
3. Toaster 4-Slice - ₹1599 (from ₹2499)
4. Fully Automatic Washing Machine - ₹18999 (from ₹24999)
5. Semi-Automatic Washing Machine - ₹7499 (from ₹9999)
6. Double Door Refrigerator - ₹26999 (from ₹34999)
7. Single Door Refrigerator - ₹11499 (from ₹14999)
8. Split AC 1.5 Ton - ₹22999 (from ₹29999)
9. Window AC 1 Ton - ₹10499 (from ₹13999)
10. Additional Kitchen Items

### Sample Orders (3)
- Order 1: John Doe - 2×T-Shirt + 1×Graphic T-Shirt - **Delivered**
- Order 2: Jane Smith - Formal Shirt + Evening Dress - **Processing**
- Order 3: John Doe - Blender - **Shipped**

---

## Verification

### 1. Check MongoDB

After seeding, verify data in MongoDB:

```bash
# If using MongoDB Shell
mongosh

# Connect to database
use clothing-home

# Check collections
show collections

# Sample queries
db.users.find()
db.categories.find()
db.products.find()
db.orders.find()
```

### 2. Test Frontend

1. **Start both services:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

2. **Test Login:**
   - Go to Login page
   - Enter: `john@example.com` / `password123`
   - Should login successfully and redirect to Home

3. **Test Products:**
   - Go to Clothing page
   - Should display 6 seeded products
   - Test filters (category, price, rating)
   - Test sorting (newest, price, rating)

4. **Test Categories:**
   - Home page should display all 10 categories
   - Click categories to filter products

---

## Troubleshooting

### ❌ MongoDB Connection Failed

**Error:** `❌ Database connection failed: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. **Local MongoDB:** Start MongoDB service
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **MongoDB Atlas:** Check connection string in `.env`
   - Verify username/password
   - Whitelist your IP address
   - Check database name

### ❌ Module Not Found

**Error:** `Cannot find module 'bcrypt'`

**Solution:**
```bash
cd backend
npm install
```

### ❌ Port Already in Use

**Error:** `Error: listen EADDRINUSE :::5000`

**Solution:**
```bash
# Kill the process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### ✅ Seed ran but no data shows in frontend

**Possible causes:**
1. Frontend not fetching data after login
2. API URL incorrect in `.env.local`
3. Backend server not running

**Solution:**
```bash
# Check browser console for API errors
# Verify REACT_APP_API_URL in frontend/.env.local
# Restart both servers

cd backend && npm run dev
cd frontend && npm start
```

---

## Next Steps

### 🎯 Testing Workflow

1. ✅ Seed database with `npm run seed`
2. ✅ Start backend: `npm run dev`
3. ✅ Start frontend: `npm start`
4. ✅ Test login with seeded credentials
5. ✅ Browse products and categories
6. ✅ Test shopping cart
7. ✅ Create test orders
8. ✅ Check admin dashboard

### 📦 Frontend Pages to Connect

- [x] Login/Register - Connected ✅
- [x] Home - Connected ✅
- [x] Clothing - Connected ✅
- [ ] Appliances - Use same pattern as Clothing
- [ ] Product Detail - Fetch single product by ID
- [ ] Cart/Checkout - Create orders
- [ ] My Orders - Fetch user orders
- [ ] Admin Panel - Manage products/orders

### 🔧 Customization

To add more seed data:

1. Edit `backend/seed.js` to add more products/users
2. Add images for new products
3. Adjust pricing and discounts
4. Run `npm run seed` again

---

## Support

For issues or questions:
1. Check error messages in console
2. Verify MongoDB connection
3. Check network requests in browser DevTools
4. Review backend server logs

**Happy Testing! 🚀**
