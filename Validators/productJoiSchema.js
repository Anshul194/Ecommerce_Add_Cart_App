const Joi = require('joi');

const productJoiSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Product name is required'
    }),
    description: Joi.string().messages({
        'string.empty': 'Product description cannot be empty'
    }),
    price: Joi.number().required().messages({
        'any.required': 'Product price is required'
    }),
    categoryId: Joi.string().required().messages({
        'any.required': 'Category ID is required'
    }),
    stock: Joi.number().required().messages({
        'any.required': 'Product quantity is required'
    })
});

module.exports = productJoiSchema;
