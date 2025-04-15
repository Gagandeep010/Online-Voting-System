import express from 'express';
import { sendOtp } from '../controller/LoginController/SendOtpController';
import { verifyOtp } from '../controller/LoginController/VerifyOtpController';

const loginRouter = express.Router();
loginRouter.post('/send-otp', sendOtp);
loginRouter.post('/verify-otp', verifyOtp);

export default loginRouter;