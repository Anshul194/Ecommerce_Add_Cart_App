const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  

const validateUser = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized Token not provided" });
  }
  token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.Access_Token_Secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Invalid token" });
    }
    if (!decoded.user || !decoded.user.isUserToken) {
      return res.status(403).json({ message: "Invalid user token" });
    }
    try {
        console.log(decoded.user.id)
      const user = await User.findById(decoded.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
});

module.exports = validateUser;
