import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserProfile = async (userId) => {
  return await UsersCollection.findOne({ _id: userId }).select('-password');
};

export const updateUserProfile = async (userId, updateData, file) => {
  if (file) {
    const photoUrl = await saveFileToCloudinary(file);
    updateData.photo = photoUrl;
  }

  if (updateData.email) {
    const emailExists = await UsersCollection.findOne({
      email: updateData.email,
    });

    if (emailExists && emailExists._id.toString() !== userId.toString()) {
      throw new Error('Email is already in use');
    }
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await UsersCollection.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
};
