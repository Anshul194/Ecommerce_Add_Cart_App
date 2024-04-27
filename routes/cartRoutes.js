const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');
const isAuthenticated = require('../middleware/isUserAuthenticate');

router.post('/add/cart/:productId',isAuthenticated, cartController.addToCart);

router.delete('/remove/cart/:productId',isAuthenticated,cartController.removeFromCart);

router.patch('/cart/increment/:productId', isAuthenticated, cartController.incrementQuantity);

router.patch('/cart/decrement/:productId', isAuthenticated, cartController.decrementQuantity);

router.get('/cart', isAuthenticated, cartController.getCart);


module.exports = router;
