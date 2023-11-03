import { model, Schema } from 'mongoose';
import ReportInterface from '../interfaces/ReportInterface.js';

const ReportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    },
    result: {
      type: Object,
      required: [true, 'Result is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Report',
  }
);

const Report = model<ReportInterface>('Report', ReportSchema);

export default Report;
