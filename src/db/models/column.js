import { model, Schema } from 'mongoose';
import { UsersCollection } from './user.js';
import { BoardsCollection } from './board.js';

const columnsSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UsersCollection,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: BoardsCollection,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ColumnsCollection = model('columns', columnsSchema);
