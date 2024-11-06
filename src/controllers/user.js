import { getUserProfile, updateUserProfile } from '../services/users.js';

export const getProfile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user._id);

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
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedData = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.password && { password: req.body.password }),
      ...(req.body.theme && { theme: req.body.theme }),
    };

    const user = await updateUserProfile(req.user._id, updatedData, req.file);

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
    if (error.message === 'Email is already in use') {
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }

    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};
