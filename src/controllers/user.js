import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getProfile = async (req, res) => {
  try {
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
      data: {
        ...user,
        theme: user.theme || 'light',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: await bcrypt.hash(password, 10) }),
    };

    if (req.file) {
      try {
        const photoUrl = await saveFileToCloudinary(req.file);
        updatedData.photo = photoUrl;
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'Failed to upload profile photo',
        });
      }
    }

    if (email) {
      const emailExists = await UsersCollection.findOne({ email });
      if (
        emailExists &&
        emailExists._id.toString() !== req.user._id.toString()
      ) {
        return res.status(409).json({
          status: 409,
          message: 'Email is already in use',
        });
      }
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
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};
