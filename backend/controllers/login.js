const User = require("../models/User");
const bycrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const foramatEmail = email.trim();
  const formatPass = password.trim();

  try {
    const user = await User.findOne({ email: foramatEmail });
    if (!user) {
      const error = new Error("Invalid email!");
      error.statusCode = 400;
      throw error;
    }

    const isPassMatch = await bycrypt.compare(formatPass, user.password);

    if (!isPassMatch) {
      const error = new Error("Invalid password!");
      error.statusCode = 400;
      throw error;
    }

    const accessToken = jwt.sign(
      { email: foramatEmail, userId: user._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "logged in successfully",
      status: true,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = handleLogin;
