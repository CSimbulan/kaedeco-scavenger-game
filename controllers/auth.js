const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(
        new ErrorResponse("Please provide username, email and password", 400)
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // Explicitly ing password

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return res
      .status(200)
      .json({ success: true, token: "This is an example token" });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

const resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
};

module.exports = { register, login, forgotPassword, resetPassword };
