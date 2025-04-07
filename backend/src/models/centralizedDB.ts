import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    adharID: { type: String, required: true, unique: true },
  },
  { collection: "Users" } // ✅ Explicitly define collection name
);

export default mongoose.model("User", userSchema);
