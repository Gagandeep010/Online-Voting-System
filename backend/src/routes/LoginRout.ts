import express from "express";
import { verifyOtp } from "../controller/LoginController/VerifyOtpController";
import { sendOtp } from "../controller/LoginController/SendOtpController";

const router = express.Router();

router.post("/SendOtp", sendOtp);
router.post("/VerifyOtp",verifyOtp);

export default router;