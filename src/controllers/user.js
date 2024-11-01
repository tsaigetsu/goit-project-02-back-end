import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getProfile = async (req, res) => {
  const user = await UsersCollection.findOne({ _id: req.user._id }).select(
    '-password',
  );

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }

  res.json({
    status: 200,
    message: 'Profile retrieved successfully',
    data: user,
  });
};

export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const updatedData = {};

  if (name) updatedData.name = name;
  if (email) updatedData.email = email;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedData.password = hashedPassword;
  }

  if (req.file) {
    const photoUrl = await saveFileToCloudinary(req.file);
    updatedData.photo = photoUrl;
  }

  const user = await UsersCollection.findByIdAndUpdate(
    req.user._id,
    updatedData,
    { new: true },
  );

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }

  res.json({
    status: 200,
    message: 'Profile updated successfully',
    data: user,
  });
};
