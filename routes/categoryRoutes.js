const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const isAuthenticated = require('../middleware/isAdminAuthenticate');


router.get('/',categoryController.getAllCategories);

router.get('/:id',categoryController.getCategoryById);

router.post('/',isAuthenticated,categoryController.createCategory);

router.put('/:id',isAuthenticated, categoryController.updateCategory);

router.delete('/:id',isAuthenticated, categoryController.deleteCategory);

module.exports = router;
