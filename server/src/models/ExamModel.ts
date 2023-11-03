import { Schema, model } from 'mongoose';
import ExamInterface from '../interfaces/ExamInterface.js';

const ExamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: [true, 'Name already in use'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    total: {
      type: Number,
      required: [true, 'Total is required'],
    },
    correct: {
      type: Number,
      required: true,
    },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: 'Question',
      required: [true, 'Questions are required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Exam',
  }
);

const Exam = model<ExamInterface>('Exam', ExamSchema);

export default Exam;
