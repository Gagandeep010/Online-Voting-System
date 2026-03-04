// src/controller/FacialRecognitionController.ts

import { Request, Response } from "express";
import User from "../models/centralizedDB";
import {
  verifyFacialMatch,
  isValidEmbedding,
  generateAverageEmbedding,
} from "../utility/FacialRecognitionService";

/**
 * Register facial embedding during user signup
 * Stores the facial embedding for future verification
 */
export const registerFacialEmbedding = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID, facialEmbedding } = req.body;

  try {
    // Validate required fields
    if (!adharID || !facialEmbedding) {
      return res
        .status(400)
        .json({ message: "Aadhar ID and facial embedding are required" });
    }

    // Validate embedding format
    if (!isValidEmbedding(facialEmbedding)) {
      return res
        .status(400)
        .json({ message: "Invalid facial embedding format" });
    }

    // Find user by Aadhar ID
    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user already has facial embedding registered
    if (user.facialEmbedding && user.facialVerified) {
      return res
        .status(400)
        .json({ message: "User already has facial verification registered" });
    }

    // Store facial embedding
    user.facialEmbedding = facialEmbedding;
    user.facialVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Facial embedding registered successfully",
      user: {
        adharID: user.adharID,
        user_name: user.user_name,
        facialVerified: user.facialVerified,
      },
    });
  } catch (error) {
    console.error("Error registering facial embedding:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Verify facial embedding during login
 * Compares captured facial embedding with stored embedding
 */
export const verifyFacialEmbedding = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID, facialEmbedding } = req.body;
  const SIMILARITY_THRESHOLD = parseFloat(
    process.env.FACIAL_SIMILARITY_THRESHOLD || "0.6"
  ); // 0.6 is a good threshold for face-api.js
  const MAX_VERIFICATION_ATTEMPTS = 5;

  try {
    // Validate required fields
    if (!adharID || !facialEmbedding) {
      return res
        .status(400)
        .json({ message: "Aadhar ID and facial embedding are required" });
    }

    // Validate embedding format
    if (!isValidEmbedding(facialEmbedding)) {
      return res
        .status(400)
        .json({ message: "Invalid facial embedding format" });
    }

    // Find user by Aadhar ID
    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has registered facial embedding
    if (!user.facialEmbedding || !user.facialVerified) {
      return res.status(400).json({
        message:
          "User facial embedding not registered. Please register first.",
      });
    }

    // Check verification attempts
    if (user.facialVerificationAttempts >= MAX_VERIFICATION_ATTEMPTS) {
      return res.status(429).json({
        message:
          "Too many verification attempts. Please try again later or contact support.",
      });
    }

    // Verify facial embedding
    const isMatch = verifyFacialMatch(
      user.facialEmbedding as number[],
      facialEmbedding,
      SIMILARITY_THRESHOLD
    );

    if (!isMatch) {
      // Increment verification attempts
      user.facialVerificationAttempts = (user.facialVerificationAttempts || 0) + 1;
      await user.save();

      return res.status(401).json({
        message: "Facial verification failed. Please try again.",
        attemptsRemaining: MAX_VERIFICATION_ATTEMPTS - user.facialVerificationAttempts,
      });
    }

    // Reset verification attempts on successful match
    user.facialVerificationAttempts = 0;
    user.lastFacialVerification = new Date();
    await user.save();

    return res.status(200).json({
      message: "Facial verification successful",
      verified: true,
      user: {
        adharID: user.adharID,
        user_name: user.user_name,
        facialVerified: user.facialVerified,
      },
    });
  } catch (error) {
    console.error("Error verifying facial embedding:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get facial verification status for a user
 */
export const getFacialVerificationStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID } = req.params;

  try {
    if (!adharID) {
      return res.status(400).json({ message: "Aadhar ID is required" });
    }

    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      adharID: user.adharID,
      user_name: user.user_name,
      facialVerified: user.facialVerified,
      lastFacialVerification: user.lastFacialVerification,
      facialVerificationAttempts: user.facialVerificationAttempts,
    });
  } catch (error) {
    console.error("Error getting facial verification status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Reset facial embedding (allow user to re-register)
 * Usually used in settings/profile management
 */
export const resetFacialEmbedding = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID } = req.body;

  try {
    if (!adharID) {
      return res.status(400).json({ message: "Aadhar ID is required" });
    }

    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset facial data
    user.facialEmbedding = null;
    user.facialVerified = false;
    user.facialVerificationAttempts = 0;
    await user.save();

    return res.status(200).json({
      message: "Facial embedding reset successfully",
      user: {
        adharID: user.adharID,
        user_name: user.user_name,
        facialVerified: user.facialVerified,
      },
    });
  } catch (error) {
    console.error("Error resetting facial embedding:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
