const User = require("../models/User");

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ "otp.otp": otp });

    if (!user) {
      const error = new Error("invalid otp");
      error.statusCode = 400;
      throw error;
    }

    if (new Date(user.otp?.sendTime).getTime() < new Date().getTime()) {
      const error = new Error("otp expired");
      error.statusCode = 400;
      throw error;
    }

    user.otp.otp = null;
    await user.save();

    res.status(200).json({
      message: "otp verified",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyOtp;