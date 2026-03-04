// src/routes/FacialRecognitionRoutes.ts

import { Router } from "express";
import {
  registerFacialEmbedding,
  verifyFacialEmbedding,
  getFacialVerificationStatus,
  resetFacialEmbedding,
} from "../controller/FacialRecognitionController";

const router = Router();

/**
 * POST /api/facial/register
 * Register facial embedding during signup
 * Body: { adharID, facialEmbedding }
 */
router.post("/register", registerFacialEmbedding);

/**
 * POST /api/facial/verify
 * Verify facial embedding during login
 * Body: { adharID, facialEmbedding }
 */
router.post("/verify", verifyFacialEmbedding);

/**
 * GET /api/facial/status/:adharID
 * Get facial verification status for a user
 */
router.get("/status/:adharID", getFacialVerificationStatus);

/**
 * POST /api/facial/reset
 * Reset facial embedding - allow user to re-register
 * Body: { adharID }
 */
router.post("/reset", resetFacialEmbedding);

export default router;
