const User = require('../models/User');
const userService = require('../services/userService');
const expressAsyncHandler = require('express-async-handler')
const SuccessHandler = require('../SuccessResponse');
const {validateLogin} = require('../Validators/validateUser')

const signup = expressAsyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = await userService.createUser( username, email, password );
        return SuccessHandler.sendSuccessResponse(res,'User created successfully',{user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const signin = expressAsyncHandler(async (req, res) => {
    const userData = req.body;
  
    const { error } = validateLogin(userData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      const logedUser = await userService.signin(userData, req, res);
      return SuccessHandler.sendSuccessResponse(res,'User successfully loggedIn',{token: logedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


module.exports={signup,signin}