const express = require('express');
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

const FRONTEND_URL = process.env.FRONTEND_URL || "*";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const jazzcashRoutes = require("./routes/jazzcashRoutes");
app.use("/api/jazzcash", jazzcashRoutes);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});