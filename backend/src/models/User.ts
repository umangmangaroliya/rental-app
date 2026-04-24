import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "ADMIN" | "STAFF";
  branchId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "STAFF"], default: "STAFF" },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: false }, // Admins might not need a branch
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
