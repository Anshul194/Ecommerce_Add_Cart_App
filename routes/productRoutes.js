const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/productController');
const isAuthenticated = require('../middleware/isAdminAuthenticate');


router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.post('/add/',isAuthenticated,ProductController.addProduct);

router.put('/:id',isAuthenticated,ProductController.updateProduct);

module.exports = router;
