// src/controllers/helpController.js

import helpMail from '../utils/helpMail.js';

async function sendHelpCommentController(req, res, next) {
  const { comment, email } = req.body;

  if (!comment || !email) {
    return res.status(400).json({ success: false, message: 'Коментар та email є обов’язковими.' });
  }

  try {
    const result = await helpMail(comment, email);
    res.status(200).json(result);
  } catch (error) {
    next(error); // Передаємо помилку у глобальний обробник помилок
  }
}

export { sendHelpCommentController };
