const express = require("express");
const router = express.Router();
const productController = require('../controller/ProductController');
const { authMiddleware} = require("../middleware/authMiddleware");

router.post('/create-product',productController.createProduct)
router.put('/update-product/:_id',authMiddleware,productController.updateProduct)
router.get('/get-detail-product/:_id',productController.getDetailProduct)
router.delete('/delete-product/:_id',productController.deleteProduct)

router.get('/getall-product',productController.getAllProduct)

module.exports = router;