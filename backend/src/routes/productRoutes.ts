import express from "express";
import { getProducts, createProduct, getProductInventory, addInventoryItem } from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/inventory").get(protect, getProductInventory).post(protect, addInventoryItem);

export default router;
