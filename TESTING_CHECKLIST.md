# Setup & Testing Checklist

## Initial Setup

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install` (if not done)
- [ ] Create `.env` file with:
  ```
  PORT=5000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  CLIENT_URL=http://localhost:3000
  ```
- [ ] Run `npm run dev`
- [ ] Verify backend running on `http://localhost:5000`
- [ ] Check health endpoint: `GET http://localhost:5000/` (should return success message)

### Frontend Setup  
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install` (if not done)
- [ ] `.env.local` already created with:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```
- [ ] Run `npm start`
- [ ] Frontend should open on `http://localhost:3000`

## Database Seeding

1. **Create Products** (via Postman or admin panel):
```json
POST http://localhost:5000/api/products
{
  "name": "Blue T-Shirt",
  "description": "Premium cotton blue t-shirt",
  "price": 599,
  "salePrice": 499,
  "discount": 17,
  "category": "clothing",
  "brand": "D-Brand",
  "rating": 4.5,
  "images": ["url1", "url2"],
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Blue", "Black"],
  "stock": 50,
  "type": "clothing"
}
```

2. **Create Categories**:
```json
POST http://localhost:5000/api/categories
{
  "name": "T-Shirts",
  "slug": "t-shirts",
  "icon": "url",
  "type": "clothing",
  "description": "Casual t-shirts",
  "count": 5
}
```

## Testing Workflow

### 1. Test Authentication

**Sign Up:**
- [ ] Go to `http://localhost:3000/login`
- [ ] Click "Create Account"
- [ ] Fill form with:
  - Name: Test User
  - Email: test@example.com
  - Phone: 9876543210
  - Password: Password123
- [ ] Click "Create Account"
- [ ] Should see success message
- [ ] Check DevTools → Application → localStorage
- [ ] Should see `authToken` saved

**Sign In:**
- [ ] Go back to `/login`
- [ ] Click "Sign In"
- [ ] Use registered email/password
- [ ] Should be redirected to home
- [ ] Should see user is authenticated

**Sign Out:**
- [ ] Click user menu (top right, if implemented)
- [ ] Click "Logout"
- [ ] Token should be cleared from localStorage
- [ ] Should be redirected to home

### 2. Test Product Listing (Clothing Page)

- [ ] Go to `http://localhost:3000/clothing`
- [ ] Check Network tab → look for API calls
- [ ] Should see `GET /api/products` request
- [ ] Response should have product data
- [ ] Products should display on page
- [ ] Test filters:
  - [ ] Select a brand → products should filter
  - [ ] Select price range → products should filter
  - [ ] Select rating → products should filter
- [ ] Test search:
  - [ ] Type in search box → results should filter
- [ ] Test sorting:
  - [ ] Change sort dropdown → order should change

### 3. Test Cart (if implemented)

- [ ] Click "Add to Cart" on any product
- [ ] Cart count should increase (if shown in header)
- [ ] Go to `/cart`
- [ ] Product should appear in cart
- [ ] Can increase/decrease quantity
- [ ] Can remove from cart

### 4. Test Wishlist (if implemented)

- [ ] Click heart icon on product
- [ ] Go to `/wishlist`
- [ ] Product should appear
- [ ] Can remove from wishlist

### 5. Test Product Detail (when implemented)

- [ ] Click on product image/name
- [ ] Should navigate to `/product/:id`
- [ ] Check Network → should see `GET /api/products/:id`
- [ ] Product details should load
- [ ] Can add to cart/wishlist

### 6. Test User Profile (when implemented)

- [ ] Must be logged in
- [ ] Go to `/my-account`
- [ ] Should display user info
- [ ] Can edit profile
- [ ] Changes should save to backend

### 7. Test Orders (when implemented)

- [ ] Add items to cart
- [ ] Go to `/cart` → Click "Checkout"
- [ ] Fill shipping address
- [ ] Complete order
- [ ] Check Network → `POST /api/orders`
- [ ] Should get order ID in response
- [ ] Go to `/my-orders`
- [ ] Order should appear
- [ ] Should show order status

## DevTools Network Debugging

**To check API calls:**
1. Open DevTools (F12)
2. Go to "Network" tab
3. Perform action (login, search, etc.)
4. Look for requests to `http://localhost:5000/api/*`

**Expected responses should have:**
```json
{
  "success": true,
  "data": { ... },
  "message": "..."
}
```

**Error responses should have:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Common Issues & Solutions

### Issue: "Cannot POST /api/products"
**Solution:** 
- Ensure backend is running
- Check backend console for errors
- Verify `/api/products` route exists in backend
- Check middleware are properly ordered

### Issue: CORS Error
**Solution:**
- Backend should have CORS enabled
- Check `index.js` has cors middleware
- Browser console will show CORS error details
- Verify `CLIENT_URL` in backend `.env`

### Issue: Authentication failing
**Solution:**
- Check if user exists in database
- Verify JWT secret is same in `.env`
- Check password hashing on backend
- Look at backend error logs

### Issue: Products not loading
**Solution:**
- Check if products exist in database
- Verify database connection in backend
- Check Network tab for API response
- Look for 404 or 500 errors

### Issue: Token not persisting
**Solution:**
- Check browser localStorage (DevTools → Application)
- Verify login response includes `token`
- Check if localStorage is being cleared
- Try incognito window

## Production Checklist

- [ ] Remove `console.log` statements
- [ ] Update `.env.local` with production API URL
- [ ] Test all pages in production mode (`npm run build`)
- [ ] Set secure cookies (HTTPS only)
- [ ] Enable CORS for production domain only
- [ ] Implement rate limiting
- [ ] Add error boundaries in React
- [ ] Set up error logging
- [ ] Enable HTTPS
- [ ] Use environment variables for sensitive data

## Performance Optimization

- [ ] Implement lazy loading for images
- [ ] Add pagination for product lists
- [ ] Cache API responses (React Query/SWR)
- [ ] Minify CSS/JavaScript
- [ ] Use CDN for static assets
- [ ] Implement code splitting
- [ ] Add service worker for offline support

## Security Checklist

- [ ] Validate all form inputs
- [ ] Sanitize user input
- [ ] Use HTTPS for all connections
- [ ] Don't store passwords in localStorage
- [ ] Implement CSRF protection
- [ ] Add rate limiting on backend
- [ ] Use secure cookies (HttpOnly, Secure flags)
- [ ] Implement input validation on backend
- [ ] Use strong JWT secrets
- [ ] Keep dependencies updated

## Testing Tools

Install for better testing:
```bash
# Backend testing
npm install --save-dev jest supertest

# Frontend testing  
npm install --save-dev vitest @testing-library/react

# API testing
# Download Postman: https://www.postman.com/
```

## Monitoring in Development

**Backend console should show:**
```
Server running on port 5000
Connected to MongoDB
```

**Browser console should:**
- [ ] Not show CORS errors
- [ ] Not show unhandled promise rejections
- [ ] Log API responses in Network tab

---

**Current Status:**
- ✅ Backend configured
- ✅ Frontend connected
- ✅ Authentication ready
- ✅ Product listing ready
- ⏳ Other pages ready for testing
- ⏳ Payment integration (needs implementation)
- ⏳ Email notifications (needs implementation)

**Next:** Start testing with the checklist above!
