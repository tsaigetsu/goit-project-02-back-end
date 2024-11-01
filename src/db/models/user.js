import { model, Schema } from 'mongoose';
import { emailRegexp, passwordRegexp } from '../../constants/users.js';

const usersSchema = new Schema(
  {
    photo: {
      type: String,
      default: '../../uploads/default-user.jpg',
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
      match: passwordRegexp,
      required: true,
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
