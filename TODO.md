# TODO List for Running Servers

- [x] Install Node.js and npm (if not installed)
- [x] Install backend dependencies: cd e-commerce_react/backend && npm install
- [x] Install frontend dependencies: cd e-commerce_react/frontend && npm install
- [x] Create .env file in backend with PORT and MONGODB_URI
- [x] Start backend server: cd e-commerce_react/backend && node server.js (runs on port 3000)
- [x] Start frontend dev server: cd e-commerce_react/frontend && npm run dev (runs on port 5173)
- [x] Set up MongoDB: Either install local MongoDB or use MongoDB Atlas, then set MONGO_URI in e-commerce_react/backend/.env
- [x] Ensure MongoDB is running and MONGO_URI is correct to fix database connection error
- [x] Test the application: Open http://localhost:5173/ for frontend, use curl for backend endpoints like http://localhost:3000/products
