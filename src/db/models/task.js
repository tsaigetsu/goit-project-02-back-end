import { model, Schema } from 'mongoose';
import { UsersCollection } from './user.js';
import { ColumnsCollection } from './column.js';

const tasksSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    priority: {
      type: String,
      enum: ['without priority', 'low', 'medium', 'high'],
      required: true,
      default: 'without priority',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UsersCollection,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ColumnsCollection,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TasksCollection = model('tasks', tasksSchema);
