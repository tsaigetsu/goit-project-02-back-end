import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { env } from '../utils/env.js';

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return next(createError(400, 'Token and new password are required.'));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, env('JWT_SECRET'));
    } catch (error) {
      return next(createError(401, 'Token is expired or invalid.'));
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return next(createError(404, 'User not found!'));
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    await Session.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset, and all sessions have been deleted.',
      data: {},
    });
  } catch (error) {
    console.error(`Error resetting password: ${error.message}`);
    next(createError(500, 'Failed to reset the password.'));
  }
};
