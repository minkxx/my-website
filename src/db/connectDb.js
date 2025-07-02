import mongoose from "mongoose";

export default async function connectDb() {
  if (mongoose.connection.readyState >= 1) {
    // Already connected or connecting
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected successfully");
    return;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
}