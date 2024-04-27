const Product = require('../models/Product');

// Service method to fetch all products
const getAllProducts = async (page,limit) => {
   
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    const products = await Product.find()
        .populate('categoryId')
        .skip(skip)
        .limit(limit);

    return {
        products: products,
        totalPages: totalPages
    };
};


const getProductById = async (productId) => {
    const products= await Product.findById(productId).populate('categoryId')
    return products;
};


const addProduct = async (name, price, description, categoryId,stock) => {
    const product = await Product.create({
        name,
        price,
        description,
        stock,
        categoryId
    });
    return await product.save();
};


const updateProduct = async (productId, name, price, description, stock) => {
    try {
        console.log(productId)
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, 
            { name, price, description, stock }, 
            { new: true }
        );
        return updatedProduct;
    } catch (error) {
        console.error('Error in updateProduct controller:', error);
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct
};
