// src/controller/VoteController.ts

import { Request, Response } from "express";
import Vote from "../models/Candidate";
import User from "../models/centralizedDB";
import { blockchainService } from "../utility/BlockchainVoteService";

/**
 * Function for voting for a candidate
 * Includes checks for:
 * - User exists and is verified
 * - Facial verification completed
 * - User hasn't already voted
 * - Blockchain recording
 */
export const voteForCandidate = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userID, adharID, candidateID } = req.body;

  try {
    // Validate input
    if (!adharID || !candidateID) {
      return res.status(400).json({
        message: "Aadhar ID and Candidate ID are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has completed facial verification
    if (!user.facialVerified) {
      return res.status(403).json({
        message:
          "Facial verification required. Please complete facial authentication first.",
      });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ userID: adharID });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    // Create a new vote record in database
    const vote = new Vote({ userID: adharID, candidateID });
    await vote.save();

    // Attempt to record vote on blockchain
    let blockchainTxHash: string | null = null;
    try {
      blockchainTxHash = await blockchainService.recordVote({
        voterAdharID: adharID,
        candidateID: candidateID,
        timestamp: Date.now(),
      });
      console.log("Vote recorded on blockchain:", blockchainTxHash);
    } catch (blockchainError) {
      console.warn(
        "Warning: Vote recorded in database but failed on blockchain:",
        blockchainError
      );
      // Note: Vote is already saved to DB. Blockchain recording is supplementary.
    }

    // Update user voting status
    user.hasVoted = true;
    await user.save();

    return res.status(201).json({
      message: "Vote recorded successfully",
      vote: {
        userID: adharID,
        candidateID: candidateID,
        blockchainTx: blockchainTxHash || null,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("Error in voting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Function to get vote tally for all candidates
 */
export const getVoteTally = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Get tally from database
    const tally = await Vote.aggregate([
      { $group: { _id: "$candidateID", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Try to verify from blockchain as well
    const blockchainVotes: any = {};
    try {
      for (const entry of tally) {
        try {
          const blockchainCount = await blockchainService.getVoteCount(
            entry._id
          );
          blockchainVotes[entry._id] = blockchainCount;
        } catch (e) {
          console.warn(`Could not get blockchain count for candidate ${entry._id}`);
        }
      }
    } catch (blockchainError) {
      console.warn("Could not fetch blockchain vote data:", blockchainError);
    }

    // Return database tally with blockchain reference
    return res.status(200).json({
      databaseTally: tally,
      blockchainVotes: Object.keys(blockchainVotes).length > 0 ? blockchainVotes : null,
      note: "Blockchain votes serve as tamper-proof verification. Database is primary source.",
    });
  } catch (error) {
    console.error("Error in getting vote tally:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Function to check user voting status
 */
export const checkVotingStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { adharID } = req.params;

  try {
    if (!adharID) {
      return res.status(400).json({ message: "Aadhar ID is required" });
    }

    const user = await User.findOne({ adharID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasVoted = await Vote.findOne({ userID: adharID });

    return res.status(200).json({
      adharID: user.adharID,
      user_name: user.user_name,
      hasVoted: !!hasVoted,
      facialVerified: user.facialVerified,
    });
  } catch (error) {
    console.error("Error checking voting status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
