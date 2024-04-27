const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const admin = require("../models/Admin");
const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.Access_Token_Secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    console.log(decoded.adminData )
    if (!decoded.adminData || !decoded.adminData.isAdminToken) {
      return res.status(403).json({ message: "Invalid admin token" });
    }

    try {
      const user = await admin.findById(decoded.adminData.id);
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  });
});

module.exports = validateToken;
