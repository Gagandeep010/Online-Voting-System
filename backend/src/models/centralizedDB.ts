import mongoose from "mongoose";

interface IUser {
  user_name: string;
  phoneNumber: string;
  age: number;
  adharID: string;
  facialEmbedding: number[] | null;
  facialVerified: boolean;
  facialVerificationAttempts: number;
  lastFacialVerification: Date | null;
  hasVoted: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    user_name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    adharID: { type: String, required: true, unique: true },
    facialEmbedding: { type: [Number], default: null }, // Array of facial embeddings or null
    facialVerified: { type: Boolean, default: false }, // Flag to track if facial registration completed
    facialVerificationAttempts: { type: Number, default: 0 }, // Track verification attempts
    lastFacialVerification: { type: Date, default: null }, // Track last verification
    hasVoted: { type: Boolean, default: false }, // Track if user has voted
  },
  { collection: "Users" } // ✅ Explicitly define collection name
);

export default mongoose.model<IUser>("User", userSchema);
