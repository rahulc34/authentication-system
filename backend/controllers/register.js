const User = require("../models/User");
const bycrypt = require("bcrypt");
const joi = require("joi");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const foramateName = name?.toLowerCase().trim();
  const foramatEmail = email?.toLowerCase().trim();
  const formatPass = password?.trim();

  const { error: validateError } = validateUser({
    name: foramateName,
    email: foramatEmail,
    password: formatPass,
  });

  try {
    if (validateError) {
      const error = new Error(validateError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email: foramatEmail });

    if (user) {
      const error = new Error("this email is already exist");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bycrypt.hash(formatPass, 10);

    const newUser = await User.create({
      name: foramateName,
      email: foramatEmail,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "user registered sucessfully",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
