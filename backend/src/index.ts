import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db";

dotenv.config();

import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import branchRoutes from "./routes/branchRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// Connect to Database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
