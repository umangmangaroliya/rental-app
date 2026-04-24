import { Request, Response } from "express";
import Branch from "../models/Branch";

// @desc    Get all branches
// @route   GET /api/branches
// @access  Private/Admin
export const getBranches = async (req: Request, res: Response): Promise<void> => {
  try {
    const branches = await Branch.find({});
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Create a branch
// @route   POST /api/branches
// @access  Private/Admin
export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, contactNumber } = req.body;

    const branchExists = await Branch.findOne({ name });
    if (branchExists) {
      res.status(400).json({ message: "Branch already exists" });
      return;
    }

    const branch = new Branch({
      name,
      address,
      contactNumber,
    });

    const createdBranch = await branch.save();
    res.status(201).json(createdBranch);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Update a branch
// @route   PUT /api/branches/:id
// @access  Private/Admin
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, contactNumber, isActive } = req.body;

    const branch = await Branch.findById(req.params.id);

    if (branch) {
      branch.name = name || branch.name;
      branch.address = address || branch.address;
      branch.contactNumber = contactNumber || branch.contactNumber;
      if (isActive !== undefined) branch.isActive = isActive;

      const updatedBranch = await branch.save();
      res.json(updatedBranch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
