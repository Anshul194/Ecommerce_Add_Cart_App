const expressAsyncHandler = require('express-async-handler')
const SuccessHandler = require('../SuccessResponse');

const categoryService = require('../services/categoryService');

const getAllCategories = expressAsyncHandler(async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return SuccessHandler.sendSuccessResponse(res,'All categories',{categories: categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const getCategoryById = expressAsyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return SuccessHandler.sendSuccessResponse(res,'category by id ',{category: category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const createCategory = expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await categoryService.createCategory(name);
        return SuccessHandler.sendSuccessResponse(res,{category: newCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const updatedCategory = await categoryService.updateCategory(categoryId, name);
        return SuccessHandler.sendSuccessResponse(res,{category: updatedCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const deleteCategory = expressAsyncHandler( async (req, res) => {
    try {
        const categoryId = req.query.id;
        await categoryService.deleteCategory(categoryId);
        return SuccessHandler.sendSuccessResponse(res, 'Category deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports={
    getAllCategories,getCategoryById,createCategory,updateCategory,deleteCategory
}
