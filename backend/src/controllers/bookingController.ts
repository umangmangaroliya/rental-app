import { Request, Response } from "express";
import Booking from "../models/Booking";
import InventoryItem from "../models/InventoryItem";

// @desc    Create a booking request
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, customerPhone, startDate, endDate, inventoryItems, branchId, totalAmount } = req.body;

    const orderId = "ORD-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

    const booking = new Booking({
      orderId,
      customerName,
      customerPhone,
      startDate,
      endDate,
      inventoryItems,
      branchId,
      totalAmount,
      status: "REQUESTED",
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Staff
export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({}).populate("inventoryItems").populate("branchId", "name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Staff
export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    booking.status = status;

    if (status === "PICKED_UP") {
      booking.pickupDate = new Date();
      // Update inventory to Rented
      await InventoryItem.updateMany({ _id: { $in: booking.inventoryItems } }, { status: "Rented" });
    } else if (status === "RETURNED") {
      booking.returnDate = new Date();
      // Update inventory to Cleaning
      await InventoryItem.updateMany({ _id: { $in: booking.inventoryItems } }, { status: "Cleaning" });
    } else if (status === "APPROVED") {
      // Update inventory to Reserved
      await InventoryItem.updateMany({ _id: { $in: booking.inventoryItems } }, { status: "Reserved" });
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
