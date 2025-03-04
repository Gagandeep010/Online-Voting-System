import { Request, Response } from "express";
import User from "../models/centralizedDB";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adharID, phoneNumber, dob } = req.body; // ✅ Match with model field name

    console.log("📥 Incoming Request:", req.body);

    // Validate required fields
    if (!adharID || !phoneNumber) {
      res.status(400).json({ message: "AdharID and phoneNumber are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ adharID });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Store user in DB
    const newUser = new User({ adharID, phoneNumber, dob });
    await newUser.save();

    res
      .status(201)
      .json({ message: " User created successfully", user: newUser });
  } catch (error) {
    console.error(" Error creating user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
