import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

const usersSchema = new Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: ['light', 'violet', 'dark'],
      default: 'light',
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UsersCollection = model('users', usersSchema);
