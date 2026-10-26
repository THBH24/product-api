const Product = require('../models/Product'); // Hoặc '../models/product' tùy theo tên file model của bạn

// 1. CREATE (Tạo sản phẩm mới)
const createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    const newProduct = new Product({ pid, pname, price, quantity });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. READ (Lấy danh sách tất cả sản phẩm)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. READ (Lấy chi tiết một sản phẩm theo pid)
const getProductByPid = async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. UPDATE (Cập nhật sản phẩm theo pid)
const updateProduct = async (req, res) => {
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
};

// 5. DELETE (Xóa sản phẩm theo pid)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByPid,
  updateProduct,
  deleteProduct
};