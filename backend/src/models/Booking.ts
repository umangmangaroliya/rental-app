import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  orderId: string;
  customerName: string;
  customerPhone: string;
  startDate: Date;
  endDate: Date;
  inventoryItems: mongoose.Types.ObjectId[];
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "PICKED_UP" | "RETURNED" | "CANCELLED";
  pickupDate?: Date;
  returnDate?: Date;
  branchId: mongoose.Types.ObjectId;
  totalAmount: number;
  advancePayment: number;
  balancePayment: number;
  depositAmount: number;
  overdueCharges: number;
  damageCharges: number;
  damageNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    inventoryItems: [{ type: Schema.Types.ObjectId, ref: "InventoryItem" }],
    status: {
      type: String,
      enum: ["REQUESTED", "APPROVED", "REJECTED", "PICKED_UP", "RETURNED", "CANCELLED"],
      default: "REQUESTED",
    },
    pickupDate: { type: Date },
    returnDate: { type: Date },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
    totalAmount: { type: Number, default: 0 },
    advancePayment: { type: Number, default: 0 },
    balancePayment: { type: Number, default: 0 },
    depositAmount: { type: Number, default: 0 },
    overdueCharges: { type: Number, default: 0 },
    damageCharges: { type: Number, default: 0 },
    damageNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
