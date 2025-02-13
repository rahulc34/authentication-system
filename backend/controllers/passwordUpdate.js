const User = require("../models/User");
const bcrypt = require("bcrypt");

const updatePassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;

  try {
    const user = await User.findOne({ "otp.token": token });

    if (!user) {
      const error = new Error("something went wrong");
      error.statusCode = 400;
      throw error;
    }

    if (
      new Date(user.otp?.sendTime).getTime() + 5 * 60 * 1000 <
      new Date().getTime()
    ) {
      if (password !== confirmPassword) {
        const error = new Error("password does not match");
        error.statusCode = 400;
        throw error;
      }

      const hashPassword = await bcrypt(password, 10);

      user.password = hashPassword;
      user.otp.sendTime = null;
      user.otp.token = null;
      await user.save();

      res.status(200).json({
        message: "password updated sucessfully",
        status: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updatePassword;
