import { Schema, model, Document } from "mongoose";

interface IOtp extends Document {
  adharID: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    adharID: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // ✅ Explicitly defined
  },
  { timestamps: true }
);

const Otp = model<IOtp>("Otp", otpSchema);

export default Otp;
