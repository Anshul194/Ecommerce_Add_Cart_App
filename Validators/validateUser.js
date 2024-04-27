const Joi = require('joi');

function validateRegistration(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 
      .message('Password must be alphanumeric and at least 6 characters long')
      .custom((value, helpers) => {
        if (!/\d/.test(value)) {
          return helpers.message('Password must contain at least one number');
        }
        return value;
      }),
  });

  return schema.validate(user);
}


function validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  
    return schema.validate(user);
  }
  
  module.exports = {
    validateRegistration,
    validateLogin,
  };

