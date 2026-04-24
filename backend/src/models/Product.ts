import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  images: string[];
  baseRentalPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ["Men", "Women", "Unisex"], required: true },
    images: [{ type: String }],
    baseRentalPrice: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
