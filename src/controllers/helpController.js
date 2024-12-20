// src/controllers/helpController.js

import helpMail from '../utils/helpMail.js';

async function sendHelpCommentController(req, res, next) {
  const { comment, email } = req.body;

  // Перевірка на наявність коментаря та email
  if (!comment || !email) {
    return res.status(400).json({ success: false, message: 'Коментар та email є обов’язковими.' });
  }

  // Валідація email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Невірний формат email.' });
  }

  try {
    const result = await helpMail(comment, email);
    const { message, success } = result;
    res.status(200).json({ message, status: 200, data: {success} });
  } catch (error) {
    next(error);
  }
}

export { sendHelpCommentController };
