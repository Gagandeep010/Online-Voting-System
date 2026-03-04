import express from "express";
import { signup } from "../controller/SignupController";

const router = express.Router();

router.post("/signup", signup);

export default router;
