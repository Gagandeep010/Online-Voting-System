import { Request, Response } from "express";
import Otp from "../../models/OtpModel"; // Import the Otp model
import jwt from "jsonwebtoken"; // For generating JWT token

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { adharID, otp } = req.body; // Get Aadhar ID and OTP from the request body

  try {
    // Find the OTP record in the database for the given adharID
    const otpRecord = await Otp.findOne({ adharID });

    // Debugging - check the OTP request received
    console.log("Received OTP request:", req.body);

    // If no OTP is found for the given Aadhar ID
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // If the OTP has expired
    if (Date.now() > otpRecord.expiresAt.getTime()) {
      // Delete the expired OTP record
      await Otp.deleteOne({ adharID });
      return res.status(400).json({ message: "OTP expired" });
    }


    // If the OTP doesn't match
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid - generate a JWT token for the user
    const token = jwt.sign({ adharID }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Delete the OTP record from the database after successful verification
    await Otp.deleteOne({ adharID });

    // Return the JWT token as response
    return res.status(200).json({
      message: "OTP verified successfully",
      token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};