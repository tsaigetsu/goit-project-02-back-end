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
      enum: [
        'nobg',
        'bg1',
        'bg2',
        'bg3',
        'bg4',
        'bg5',
        'bg6',
        'bg7',
        'bg8',
        'bg9',
        'bg10',
        'bg11',
        'bg12',
        'bg13',
        'bg14',
        'bg15',
      ],
      default: 'nobg',
      required: true,
    },
    iconId: {
      type: String,
      enum: ['ic1', 'ic2', 'ic3', 'ic4', 'ic5', 'ic6', 'ic7', 'ic8'],
      default: 'ic1',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoardsCollection = model('boards', boardsSchema);
