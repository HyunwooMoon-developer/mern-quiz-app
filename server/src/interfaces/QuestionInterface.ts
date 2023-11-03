import { Document, Schema } from 'mongoose';

interface QuestionInterface extends Document {
  name: string;
  correctOption: string;
  options: Object;
  exam: Schema.Types.ObjectId;
}

export default QuestionInterface;
