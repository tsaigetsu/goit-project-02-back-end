// src/utils/helpMail.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function helpMail(comment, userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Можна вибрати інший сервіс, якщо потрібно
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: 'Запит на допомогу',
    text: `Коментар: ${comment}\nEmail для відповіді: ${userEmail}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Лист надіслано успішно' };
  } catch (error) {
    console.error('Помилка при надсиланні листа:', error);
    throw new Error('Не вдалося надіслати лист');
  }
}

export default helpMail;
