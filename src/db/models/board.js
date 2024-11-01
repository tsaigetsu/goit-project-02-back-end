import { model, Schema } from 'mongoose';
import { UsersCollection } from './user.js';

const boardsSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UsersCollection,
    },
    backgroundId: {
      type: String,
      enum: ['1', '2'],
      default: '1',
      required: true,
    },
    iconId: {
      type: String,
      enum: ['1', '2'],
      default: '1',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoardsCollection = model('boards', boardsSchema);
