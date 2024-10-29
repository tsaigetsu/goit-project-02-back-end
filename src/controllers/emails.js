import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { User } from '../db/models/user.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: env('SMTP_PORT'),
  secure: false,
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.html',
    layoutsDir: path.resolve('./src/templates/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/templates/'),
  extName: '.html',
}));

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(createError(400, 'Email is required'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, 'User not found!'));
    }

    const token = jwt.sign({ email: user.email }, env('JWT_SECRET'), { expiresIn: '5m' });

    const resetLink = `${env('APP_DOMAIN')}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: env('SMTP_FROM'),
      to: user.email,
      subject: 'Reset your password',
      template: 'reset-password-email',
      context: {
        name: user.username,
        link: resetLink,
      },
    });

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    console.error(`Error sending reset email: ${error.message}`);
    next(createError(500, 'Failed to send the email, please try again later.'));
  }
};
