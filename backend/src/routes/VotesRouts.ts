// src/routes/voteRoutes.ts

import { Router } from "express";
import { voteForCandidate, getVoteTally } from "../controller/VoteController";

const router = Router();

// Route for voting
router.post("/vote", voteForCandidate);

// Route for retrieving the vote tally
router.get("/tally", getVoteTally);

export default router;
