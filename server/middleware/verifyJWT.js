const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

module.exports = (req, res, next) => {
  try {
    // Extract the token from the cookie
    const token = req.cookies["accessToken"];

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Invalid token.");
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).send("Unauthorized.");
  }
};
