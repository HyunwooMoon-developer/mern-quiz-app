import { Document, Schema } from 'mongoose';

interface ExamInterface extends Document {
  name: string;
  duration: number;
  category: string;
  total: number;
  correct: number;
  questions: Schema.Types.ObjectId[];
}

export default ExamInterface;
