// src/utils/helpMail.js

import nodemailer from 'nodemailer';

async function helpMail(comment, userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // або оберіть інший сервіс
    auth: {
      user: 'your.email@gmail.com', // Замість цього використайте свій email
      pass: 'yourpassword',         // Спеціальний пароль додатку
    },
  });

  const mailOptions = {
    from: userEmail, // Відправник - email користувача
    to: 'taskpro.project@gmail.com',
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
