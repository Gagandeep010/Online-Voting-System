import { Request, Response } from "express";
import User from "../models/centralizedDB";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, adharID, age, user_name } = req.body; //  Match with model field name

    console.log("📥 Incoming Request:", req.body);

    // Validate required fields
    if (!user_name || !phoneNumber || !adharID || !age) {
      res
        .status(400)
        .json({ message: "Name, phoneNumber, adharID and age are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ adharID });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Store user in DB
    const newUser = new User({ adharID, phoneNumber, user_name, age });
    await newUser.save();

    res
      .status(201)
      .json({ message: " User created successfully", user: newUser });
  } catch (error) {
    console.error(" Error creating user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
