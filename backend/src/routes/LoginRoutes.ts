import express from 'express';
import { sendOtp } from '../controller/LoginController/SendOtpController';
import { verifyToken } from '../controller/LoginController/VerifyOtpController';
import exp from 'constants';

const loginRouter = express.Router();
loginRouter.post('/send-otp', sendOtp);
loginRouter.post('/verify-otp', verifyToken);

export default loginRouter;