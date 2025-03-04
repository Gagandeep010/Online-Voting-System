import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    adharID: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    dob: { type: String },
  },
  { collection: "Users" } // ✅ Explicitly define collection name
);

export default mongoose.model("User", userSchema);
