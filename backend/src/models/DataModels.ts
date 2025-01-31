// backend/models/DataModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IRecord extends Document {
  name: string;
  amount: number;
  date: Date;
  verified: 'Yes' | 'No';
}

const recordSchema = new Schema<IRecord>({
  name: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  verified: { type: String, enum: ['Yes', 'No'], required: true }
}, { timestamps: true });

recordSchema.index({ date: 1 });
export default mongoose.model<IRecord>('Record', recordSchema);