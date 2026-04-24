import mongoose, { Document, Schema } from "mongoose";

export interface IBranch extends Document {
  name: string;
  address: string;
  contactNumber: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBranch>("Branch", BranchSchema);
