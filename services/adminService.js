const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    email,
    password: hashedPassword,
  });
  return await newAdmin.save();
};



const signin = async (userData, req, res) => {
  try {
    const { email, password } = userData;
    console.log(userData);

    const existingData = await Admin.findOne({ email });

    if (!existingData) {
      return res.status(400).json({ message: "Email Id does not exist" });
    }

    console.log(existingData);
    if (await bcrypt.compare(password, existingData.password)) {
      const accessToken = jwt.sign(
        {
          adminData: {
            id: existingData._id,
            email: existingData.email,
            isAdminToken: true,
          },
        },
        process.env.Access_Token_Secret,
        { expiresIn: "30m" }
      );
  
      return accessToken;
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Failed to login", error: error.message });
  }
};

module.exports = {
  createAdmin,
  signin,
};
