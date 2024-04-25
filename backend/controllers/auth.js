const crypto = require("crypto");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"
const sendEmail = require("../utils/sendEmail");

// @description     Register a user
// @route           POST /api/auth/register
// @access          Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;
    // Check if any of them is undefined
    if (!name || !email || !password) {
      return next(
        new ErrorResponse("Please provide name, email and password", 400)
      );
    }

    // Check if user already exists in our DB
    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Register and store the new user
    const user = await User.create(
      // If there is no picture present, remove 'profilePic'
      profilePic === undefined || profilePic.length === 0
        ? {
            name,
            email,
            password,
          }
        : {
            name,
            email,
            password,
            profilePic,
          }
    );

    return sendAuth(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

// @description     Login a user
// @route           POST /api/auth/login
// @access          Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // Explicitly adding password

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendAuth(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

// @description     Forgot password
// @route           POST /api/auth/forgotPassword
// @access          Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    // Generate Reset Token and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${process.env.APP_BASE_URL}/passwordReset/${resetToken}`;

    // Reset password email template in HTML
    const html = `
    <div style="background-color: 'white'; padding:10px 10px 10px 10px;">
        <div 
          style="font-size:6px; line-height:10px; padding:16px 16px 16px 16px;"
          valign="top"
          align="center"
        >
          <img
            class="max-width"
            border="0"
            style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:20% !important; width:20%; height:auto !important;"
            width="240"
            alt="kaedeco logo"
            data-proportionally-constrained="true"
            data-responsive="true"
            src="${process.env.EMAIL_LOGO_URL}"
          >
        </div>
      </div>
      <div style="background-color: #F7E6E6; padding:10px 10px 10px 10px;">
        <div style="font-family: inherit; text-align: center"><h2>Password Reset Request</h2></div>
        <hr>
        <div style="font-family: inherit; text-align: inherit; padding-top:10px;">Hi, ${user.name}</div>
        <div style="font-family: inherit; text-align: inherit"><br></div>
        <div 
          style="font-family: inherit; text-align: inherit">
          You have requested a password reset.
        </div>
        <div class="v-text-align" align="inherit" style="padding-top:10px;">
          <a href="${resetUrl}" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #d32f2f; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
            <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Click Here to Reset Your Password</span></span>
          </a>
        </div>
        <div 
          style="font-family: inherit; text-align: inherit">
          <p>Or you can use this link:</p>
          <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        </div>
      </div>
      <div style="background-color: #e0e0e0; padding:10px 10px 10px 10px;">
        <div style="font-family: inherit; text-align: inherit">
          If you did not make this request, you can ignore this message.
        </div>
      </div>
      `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: "Your password can be reset by clicking the link below",
        html,
      });

      return res
        .status(200)
        .json({ success: true, data: "Email Sent Successfully" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    return next(error);
  }
};

// @description     Reset password
// @route           PUT /api/auth/resetPassword/:resetToken
// @access          Public
const resetPassword = async (req, res, next) => {
  const { password } = req.body;

  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    user.password = password; // Modify existing password
    // As we already used the "resetPasswordToken", we will set it to "undefined"
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const sendAuth = (user, statusCode, res) => {
  return res.status(statusCode).json({
    id: user._id,
    success: true,
    name: user.name,
    email: user.email,
    admin: user.admin,
    profilePic: user.profilePic,
    token: user.getSignedToken(),
    expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
  });
};

module.exports = { register, login, forgotPassword, resetPassword };
