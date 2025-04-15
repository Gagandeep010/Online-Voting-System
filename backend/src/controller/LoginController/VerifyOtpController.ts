import { Request, Response } from "express";
import Otp from "../../models/OtpModel"; // Import the OTP model
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID, otp } = req.body;

  try {
    // Fetch OTP from database
    const otpRecord = await Otp.findOne({ adharID, otp });

    console.log("Received OTP request:", req.body); // Debugging

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Check if OTP has expired
   if (new Date().getTime() > otpRecord.expiresAt.getTime()) {
     await Otp.deleteOne({ _id: otpRecord._id });
     return res.status(400).json({ message: "OTP expired" });
   }

    // OTP is valid - issue a JWT token
    const token = jwt.sign({ adharID }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Delete OTP from database after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
