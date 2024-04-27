const expressAsyncHandler = require('express-async-handler');
const cartService = require('../services/cartService');
const productService=require('../services/productService')
const SuccessHandler = require('../SuccessResponse');


const addToCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.user.id;
    const productId=req.params.productId;
    const { quantity } = req.body;
    try {
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(product)
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
        }
        const cartItem = await cartService.addToCart(userId, productId, quantity);
        return SuccessHandler.sendSuccessResponse(res,'Successfully added to cart',{Item: cartItem });

    } catch (error) {
        console.error('Error in addToCart controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const removeFromCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.user.id;
    const  productId  = req.params.productId.trim();

    try {
        await cartService.removeFromCart(userId, productId);
        return SuccessHandler.sendSuccessResponse(res,'Item removed from cart');
    } catch (error) {
        console.error('Error in removeFromCart controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




const incrementQuantity = expressAsyncHandler(async (req, res) => {
    const userId = req.user.user.id;
    const productId = req.params.productId.trim();


    try {
        const updatedCartItem = await cartService.incrementQuantity(userId, productId);
        return SuccessHandler.sendSuccessResponse(res,'Successfully quantity updated ',{Item: updatedCartItem });
    } catch (error) {
        console.error('Error in incrementQuantity controller:', error);
        res.status(500).json({ message: 'Internal Server Error' ,error:error.message});
    }
});

const decrementQuantity = expressAsyncHandler(async (req, res) => {
    const userId = req.user.user.id;
    const productId = req.params.productId.trim();

    try {
        const updatedCartItem = await cartService.decrementQuantity(userId, productId);
        return SuccessHandler.sendSuccessResponse(res,'Successfully quantity updated ',{Item: updatedCartItem });

    } catch (error) {
        console.error('Error in decrementQuantity controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const getCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const {cart,totalPages} = await cartService.getCart(userId,page,limit);
        return SuccessHandler.sendSuccessResponse(res,'Cart Item retrieved',{Item: cart ,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                pageSize: limit
            }});

    } catch (error) {
        console.error('Error in getCart controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = { addToCart, removeFromCart,incrementQuantity,decrementQuantity,getCart};
