const expressAsyncHandler = require('express-async-handler');
const Category = require('../models/category');

const getAllCategories = expressAsyncHandler(async () => {
    const categories = await Category.find();
    return categories;
});

const getCategoryById = expressAsyncHandler(async (categoryId) => {
    const category = await Category.findById(categoryId);
    return category;
});

const createCategory = expressAsyncHandler(async (name) => {
    const newCategory = await Category.create({ name });
    return newCategory;
});

const updateCategory = expressAsyncHandler(async (categoryId, name) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
    );
    return updatedCategory;
});

const deleteCategory = expressAsyncHandler(async (categoryId) => {
    await Category.findByIdAndDelete(categoryId);
});

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
