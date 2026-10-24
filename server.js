const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Kết nối MongoDB (nammongodb container)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- API CRUD ---

// 1. CREATE (Tạo sản phẩm mới)
app.post('/api/products', async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    const newProduct = new Product({ pid, pname, price, quantity });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. READ (Lấy danh sách tất cả sản phẩm)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. READ (Lấy chi tiết một sản phẩm theo pid)
app.get('/api/products/:pid', async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE (Cập nhật sản phẩm theo pid)
app.put('/api/products/:pid', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. DELETE (Xóa sản phẩm theo pid)
app.delete('/api/products/:pid', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});