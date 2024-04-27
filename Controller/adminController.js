const Admin = require('../models/Admin');
const adminService = require('../services/adminService');
const expressAsyncHandler = require('express-async-handler')
const SuccessHandler = require('../SuccessResponse');

const signup = expressAsyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newAdmin = await adminService.createAdmin( username, email, password );
        return SuccessHandler.sendSuccessResponse(res,'Admin created successfully',{admin: newAdmin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const signin = expressAsyncHandler(async (req, res) => {
    const userData = req.body;

    try {
      const logedAdmin= await adminService.signin(userData, req, res);
      console.log(logedAdmin)
      return SuccessHandler.sendSuccessResponse(res,'Admin login successfully',{token: logedAdmin });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


module.exports={signup,signin}