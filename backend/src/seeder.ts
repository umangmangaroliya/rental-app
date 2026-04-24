import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db";
import Branch from "./models/Branch";
import User from "./models/User";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined in the .env file.");
    }

    console.log("Checking if Admin user already exists...");
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(
        `Admin user with email ${adminEmail} already exists. Skipping seeder.`,
      );
      process.exit(0);
    }

    console.log("Checking for an existing branch...");
    let branch = await Branch.findOne();

    if (!branch) {
      console.log("Creating default branch...");
      branch = await Branch.create({
        name: "Main Downtown Branch",
        address: "123 Fashion Street, City Center",
        contactNumber: "+1 555 123 4567",
        isActive: true,
      });
    }

    console.log("Creating Admin user...");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await User.create({
      name: "Admin User",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      branchId: branch._id,
      isActive: true,
    });

    console.log("Database seeded successfully!");
    console.log(`Admin Email: ${adminEmail}`);
    console.log(`Admin Password: ${adminPassword}`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

seedData();
