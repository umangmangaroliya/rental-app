import express from "express";
import { getBranches, createBranch, updateBranch } from "../controllers/branchController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, admin, getBranches).post(protect, admin, createBranch);
router.route("/:id").put(protect, admin, updateBranch);

export default router;
