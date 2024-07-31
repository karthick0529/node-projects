const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

// Handle forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    await Token.create({ userId: user._id, token });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `Please use the following link to reset your password: http://localhost:5173/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset email' });
  }
};

// Handle reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const resetToken = await Token.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    const user = await User.findById(resetToken.userId);
    user.password = password;
    await user.save();
    await resetToken.delete();

    res.status(200).json({ message: 'Password has been reset.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};
