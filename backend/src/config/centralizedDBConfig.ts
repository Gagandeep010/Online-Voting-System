import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CENTRALIZED_DB_URI =
  process.env.CENTRALIZED_DB_URI ||
  "mongodb://localhost:27017/Online_Voting_System";

  //debugging
console.log("Database URI:", process.env.CENTRALIZED_DB_URI);


const connectDB = async () => {
  try {
    await mongoose.connect(CENTRALIZED_DB_URI);
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;
