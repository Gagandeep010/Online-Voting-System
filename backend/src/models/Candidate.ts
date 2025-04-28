// src/models/Vote.ts

import { Schema, model } from "mongoose";

const voteSchema = new Schema(
  {
    userID: { type: String, required: true, unique: true }, // Each user can vote only once
    candidateID: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Vote = model("Vote", voteSchema);
export default Vote;
