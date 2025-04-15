// src/models/OtpModel.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface
export interface IOtp extends Document {
  adharID: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema(
  {
    adharID: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
