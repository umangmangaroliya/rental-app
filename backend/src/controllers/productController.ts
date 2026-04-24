import { Request, Response } from "express";
import Product from "../models/Product";
import InventoryItem from "../models/InventoryItem";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, category, gender, images, baseRentalPrice } = req.body;
    const product = new Product({ name, description, category, gender, images, baseRentalPrice });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get inventory for a product
// @route   GET /api/products/:id/inventory
// @access  Private/Staff
export const getProductInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventory = await InventoryItem.find({ productId: req.params.id }).populate("branchId", "name");
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Add inventory item
// @route   POST /api/products/:id/inventory
// @access  Private/Staff
export const addInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, uniqueBarcode, size, color } = req.body;
    const item = new InventoryItem({
      productId: req.params.id,
      branchId,
      uniqueBarcode,
      size,
      color,
    });
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
