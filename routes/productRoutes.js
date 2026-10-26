const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByPid,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Định nghĩa các tuyến đường (routes)
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:pid', getProductByPid);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;