// src/utils/helpMail.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function helpMail(comment, userEmail) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptionsToAdmin = {
    from: process.env.SMTP_FROM,
    to: 'taskpro.project@gmail.com',
    subject: 'Запит на допомогу',
    text: `Коментар користувача: ${comment}\nEmail для відповіді: ${userEmail}`,
  };

  const mailOptionsToUser = {
    from: process.env.SMTP_FROM,
    to: userEmail,
    subject: 'Ми отримали ваш запит про допомогу',
    text: `Дякуємо за ваш запит! Ми отримали вашу допомогу і найближчим часом зв’яжемося з вами з рішенням. Коментар: "${comment}"`,
  };

  try {
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);
    return { success: true, message: 'Mail delivered successful' };
  } catch (error) {
    console.error('Помилка при надсиланні листа:', error);
    throw new Error('Не вдалося надіслати лист');
  }
}

export default helpMail;
