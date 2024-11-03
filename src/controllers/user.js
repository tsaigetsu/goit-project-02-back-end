import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getProfile = async (req, res) => {
  const user = await UsersCollection.findOne({ _id: req.user._id }).select(
    '-password',
  );

  if (!user.photo) {
    user.photo = '../../uploads/default-user.jpg';
  }

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

  if (email) {
    const emailExists = await UsersCollection.findOne({ email });
    if (emailExists && emailExists._id.toString() !== req.user._id.toString()) {
      return res.status(409).json({
        status: 409,
        message: 'Email is already in use',
      });
    }
    updatedData.email = email;
  }

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
