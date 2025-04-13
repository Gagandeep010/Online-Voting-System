import { Request, Response } from "express";
import { firebaseAdmin } from "../../config/firebase";

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { idToken } = req.body;
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return res.status(200).json({
      message: "OTP verified successfully",
      user: decodedToken,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
};
