const CartItem = require('../models/cart');
const Product=require('../models/Product')
// Service to add an item to the cart
const addToCart = async (userId, productId, quantity) => {
    try {
        const cartItem = await CartItem.create({
            userId: userId,
            productId: productId,
            quantity: quantity
        });
        await cartItem.save();
        return cartItem;
    } catch (error) {
        throw new Error('Error in adding item to cart');
    }
};


const removeFromCart = async (userId, productId) => {
    try {
        const deletedCartItem = await CartItem.findOneAndDelete({ userId,productId });
        console.log('Deleted cart item:', deletedCartItem);
        if (!deletedCartItem) {
            throw new Error(`Item with productId ${productId} not found in cart`);
        }
        return deletedCartItem;
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        throw new Error('Error in removing item from cart');
    }
};



const incrementQuantity = async (userId, productId) => {
    try {
        let cartItem = await CartItem.findOne({ userId, productId });
console.log(cartItem)
        const product = await Product.findById({_id:productId});

        if (!product || cartItem.quantity > product.stock) {
            throw new Error('No stock available for this product');
        }

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
           return cartItem ;
        }
        await cartItem.save();
        return cartItem;
    } catch (error) {
        throw new Error('Error incrementing quantity: ' + error.message);
    }
};

const decrementQuantity = async (userId, productId) => {
    try {
        
        const cartItem = await CartItem.findOne({ userId, productId });

        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else if (cartItem && cartItem.quantity === 1) {
            await cartItem.remove();
        }
        else{
            return cartItem
        }

        return cartItem;
    } catch (error) {
        throw new Error('Error decrementing quantity');
    }
};

const getCart = async (userId,page,limit) => {
    try {
        const totalCount = await CartItem.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;
        if (!userId) {
            throw new Error('Please log in to view your cart.');
        }
        const cart = await CartItem.find({ userId }).populate('productId') .skip(skip)
        .limit(limit);
        return {cart:cart,totalPages: totalPages};
    } catch (error) {
        throw new Error('Error fetching user cart: ' + error.message);
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCart
};
