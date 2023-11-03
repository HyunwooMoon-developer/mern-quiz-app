import { Document, Schema } from 'mongoose';

interface ReportInterface extends Document {
  user: Schema.Types.ObjectId;
  exam: Schema.Types.ObjectId;
  result: Object;
}

export default ReportInterface;
