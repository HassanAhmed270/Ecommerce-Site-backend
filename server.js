const express = require('express');
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const jazzcashRoutes = require("./routes/jazzcashRoutes");
const cors = require('cors');
require('dotenv').config();
//
const app = express();

// ✅ Azure safe port handling
const port = process.env.PORT || 3000;

// -------------------- CORS --------------------
// ✅ keep dynamic (from env)
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// -------------------- Middleware --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- DB --------------------
connectDB();

// -------------------- Routes --------------------
app.use("/api/jazzcash", jazzcashRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);

// -------------------- Health Route --------------------
app.get('/', (req, res) => {
  res.send('Backend Running Successfully 🚀');
});

// -------------------- START SERVER --------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
