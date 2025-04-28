import { Request, Response } from "express";
import User from "../../models/centralizedDB";
import Otp from "../../models/OtpModel"; // Import the Otp model
import crypto from "crypto"; // To generate a random OTP

export const sendOtp = async (req: Request, res: Response): Promise<any> => {
  const { adharID } = req.body;

  try {
    // Fetch user by Aadhar ID
    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const phoneNumber = user.phoneNumber;
    const otp = crypto.randomInt(1000, 9999).toString(); // Generate a 4-digit OTP

    // Save OTP to the database with an expiration of 5 minutes
    const otpRecord = new Otp({
      adharID,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiration
    });

    await otpRecord.save();

    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

    return res
      .status(200)
      .json({ message: "OTP sent successfully to console." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

};
