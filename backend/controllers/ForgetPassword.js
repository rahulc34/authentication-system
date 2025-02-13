const User = require("../models/User");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

const handleForgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const formatedEmail = email.toLowerCase();

    const user = await User.findOne({ email: formatedEmail });

    if (!user) {
      const error = new Error("invalid email address");
      error.statusCode = 400;
      throw error;
    }

    if (
      user.otp.otp &&
      new Date(user.otp.sendTime).getTime() > new Date().getTime()
    ) {
      const error = new Error(
        `please wait until ${new Date(user.otp.sendTime).toLocaleTimeString()}`
      );
      error.statusCode = 400;
      throw error;
    }

    const otp = Math.floor(Math.random() * 90000) + 100000;

    const token = crypto.randomBytes(32).toString("hex");
    user.otp.otp = otp;
    user.otp.sendTime = new Date().getTime()+60000;
    user.otp.token = token;

    await user.save();

    sendMail(otp,formatedEmail)

    res.status(200).json({
      message: "please check your email for otp",
      status: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = handleForgetPassword;
