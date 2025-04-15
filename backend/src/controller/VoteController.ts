// src/controller/VoteController.ts

import { Request, Response } from "express";
import Vote from "../models/Candidate";

// Function for voting for a candidate
export const voteForCandidate = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userID, candidateID } = req.body;

  try {
    // Check if the user has already voted
    const existingVote = await Vote.findOne({ userID });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    // Create a new vote record
    const vote = new Vote({ userID, candidateID });
    await vote.save();

    return res.status(201).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error in voting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get vote tally for all candidates
export const getVoteTally = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Aggregate votes by candidateID
    const tally = await Vote.aggregate([
      { $group: { _id: "$candidateID", count: { $sum: 1 } } },
    ]);

    return res.status(200).json(tally);
  } catch (error) {
    console.error("Error in getting vote tally:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
