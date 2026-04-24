import { Request, Response } from "express";
import User from "../models/User";

// @desc    Get all users/staff
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).populate("branchId", "name");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, role, branchId, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      if (branchId !== undefined) user.branchId = branchId;
      if (isActive !== undefined) user.isActive = isActive;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        branchId: updatedUser.branchId,
        isActive: updatedUser.isActive,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
