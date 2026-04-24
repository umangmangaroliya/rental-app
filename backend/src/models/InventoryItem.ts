import mongoose, { Document, Schema } from "mongoose";

export interface IInventoryItem extends Document {
  productId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  uniqueBarcode: string;
  size: string;
  color: string;
  status: "Available" | "Reserved" | "Rented" | "Cleaning" | "Damaged";
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
    uniqueBarcode: { type: String, required: true, unique: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Reserved", "Rented", "Cleaning", "Damaged"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInventoryItem>("InventoryItem", InventoryItemSchema);
