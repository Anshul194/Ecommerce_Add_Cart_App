const expressAsyncHandler = require('express-async-handler');
const productService = require('../services/productService');
const SuccessHandler = require('../SuccessResponse');
const productValidation=require('../Validators/productJoiSchema')

const getAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { products, totalPages }  = await productService.getAllProducts(page, limit);
        return SuccessHandler.sendSuccessResponse(res, 'Products retrieved successfully', {
            products: products,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                pageSize: limit
            }
        });
    } catch (error) {
        console.error('Error in getAllProducts controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const getProductById = expressAsyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        if (product) {
            return SuccessHandler.sendSuccessResponse(res, 'Product retrieved successfully', product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error in getProductById controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const addProduct = expressAsyncHandler(async (req, res) => {
    try {
        const { name, price, description, categoryId, stock } = req.body;
        const { error } = productValidation.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const product = await productService.addProduct(name, price, description, categoryId, stock);
        return SuccessHandler.sendSuccessResponse(res, 'Product created successfully', { product });
    } catch (error) {
        console.error('Error in addProduct controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const updateProduct = expressAsyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description ,stock} = req.body;

        const updatedProduct = await productService.updateProduct(productId, name, price, description,stock);
        return SuccessHandler.sendSuccessResponse(res, 'Product updated successfully');
    } catch (error) {
        console.error('Error in updateProduct controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct
};
