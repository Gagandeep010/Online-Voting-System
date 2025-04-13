import { Request, Response } from "express";
import User from "../../models/centralizedDB";
import { getAuth } from "firebase-admin/auth";

export const sendOtp = async (req: Request, res: Response): Promise<any> => {
  const { adharID } = req.body;

  try {
    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const phoneNumber = `+91${user.phoneNumber}`;

    // Firebase requires sending OTP from frontend using reCAPTCHA
    // Backend will just verify if user exists and return phoneNumber
    return res.status(200).json({
      message: "User found",
      phoneNumber,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
