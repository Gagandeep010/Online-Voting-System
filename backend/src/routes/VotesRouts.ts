// src/routes/voteRoutes.ts

import { Router } from "express";
import {
  voteForCandidate,
  getVoteTally,
  checkVotingStatus,
} from "../controller/VoteController";

const router = Router();

/**
 * POST /api/votes/vote
 * Cast a vote for a candidate
 * Requires facial verification to be completed
 */
router.post("/vote", voteForCandidate);

/**
 * GET /api/votes/tally
 * Retrieve the vote tally for all candidates
 */
router.get("/tally", getVoteTally);

/**
 * GET /api/votes/status/:adharID
 * Check voting status for a specific user
 */
router.get("/status/:adharID", checkVotingStatus);

export default router;
