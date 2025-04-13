import express from 'express';
import { sendOtp } from '../controller/LoginController/SendOtpController';
import { verifyToken } from '../controller/LoginController/VerifyOtpController';    

const loginRoutes = express.Router();

loginRoutes.post("/send-otp", sendOtp);
loginRoutes.post("/verify-otp", verifyToken);   

export default loginRoutes;