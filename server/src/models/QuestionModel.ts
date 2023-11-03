import { model, Schema } from 'mongoose';
import QuestionInterface from '../interfaces/QuestionInterface.js';

const QuestionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    correctOption: {
      type: String,
      required: [true, 'Correct option is required'],
    },
    options: {
      type: Object,
      required: [true, 'Options required'],
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Question',
  }
);

const Question = model<QuestionInterface>('Question', QuestionSchema);

export default Question;
