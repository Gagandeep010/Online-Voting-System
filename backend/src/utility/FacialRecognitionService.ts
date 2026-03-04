// src/utility/FacialRecognitionService.ts

/**
 * Facial Recognition Service
 * Handles embedding comparison and similarity matching
 * Uses cosine similarity for face embeddings
 */

/**
 * Calculate cosine similarity between two vectors
 * Returns a score between 0 and 1 (1 = identical, 0 = completely different)
 */
export const calculateCosineSimilarity = (
  embedding1: number[],
  embedding2: number[]
): number => {
  if (
    !embedding1 ||
    !embedding2 ||
    embedding1.length !== embedding2.length
  ) {
    throw new Error("Embeddings must have the same length");
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  norm1 = Math.sqrt(norm1);
  norm2 = Math.sqrt(norm2);

  if (norm1 === 0 || norm2 === 0) {
    return 0;
  }

  return dotProduct / (norm1 * norm2);
};

/**
 * Compare facial embeddings with threshold
 * @param storedEmbedding Stored facial embedding from DB
 * @param capturedEmbedding Facial embedding from current capture
 * @param threshold Similarity threshold (default 0.6 for high security)
 * @returns Boolean indicating if match is valid
 */
export const verifyFacialMatch = (
  storedEmbedding: number[],
  capturedEmbedding: number[],
  threshold: number = 0.6
): boolean => {
  try {
    const similarity = calculateCosineSimilarity(
      storedEmbedding,
      capturedEmbedding
    );
    console.log(`Facial similarity score: ${similarity}`);
    return similarity >= threshold;
  } catch (error) {
    console.error("Error in facial verification:", error);
    return false;
  }
};

/**
 * Validate embedding format
 * @param embedding Array of numbers representing face embedding
 * @returns Boolean indicating if embedding is valid
 */
export const isValidEmbedding = (embedding: any): boolean => {
  return (
    Array.isArray(embedding) &&
    embedding.length > 0 &&
    embedding.length <= 1024 && // Face-api.js typically generates 128 or 512-dim embeddings
    embedding.every((val) => typeof val === "number")
  );
};

/**
 * Generate average embedding from multiple captures
 * Improves accuracy for facial registration
 * @param embeddings Array of facial embeddings
 * @returns Average embedding
 */
export const generateAverageEmbedding = (
  embeddings: number[][]
): number[] => {
  if (!embeddings || embeddings.length === 0) {
    throw new Error("No embeddings provided");
  }

  const embeddingLength = embeddings[0].length;
  const average: number[] = new Array(embeddingLength).fill(0);

  for (const embedding of embeddings) {
    if (embedding.length !== embeddingLength) {
      throw new Error("All embeddings must have the same length");
    }
    for (let i = 0; i < embeddingLength; i++) {
      average[i] += embedding[i];
    }
  }

  for (let i = 0; i < embeddingLength; i++) {
    average[i] /= embeddings.length;
  }

  return average;
};

export default {
  calculateCosineSimilarity,
  verifyFacialMatch,
  isValidEmbedding,
  generateAverageEmbedding,
};
