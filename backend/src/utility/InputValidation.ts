// src/utility/InputValidation.ts

/**
 * Input Validation Utility
 * Provides functions for validating and sanitizing user input
 */

/**
 * Validate Aadhar ID format (12-digit number)
 */
export const isValidAadharID = (adharID: any): boolean => {
  if (typeof adharID !== "string") return false;
  return /^\d{12}$/.test(adharID.trim());
};

/**
 * Validate phone number format (10 digits)
 */
export const isValidPhoneNumber = (phoneNumber: any): boolean => {
  if (typeof phoneNumber !== "string") return false;
  return /^\d{10}$/.test(phoneNumber.trim());
};

/**
 * Validate OTP format (typically 6 digits)
 */
export const isValidOTP = (otp: any): boolean => {
  if (typeof otp !== "string") return false;
  return /^\d{6}$/.test(otp.trim());
};

/**
 * Validate age (between 18 and 120)
 */
export const isValidAge = (age: any): boolean => {
  const numAge = parseInt(age, 10);
  return !isNaN(numAge) && numAge >= 18 && numAge <= 120;
};

/**
 * Validate username (alphanumeric with spaces, 2-50 chars)
 */
export const isValidUsername = (username: any): boolean => {
  if (typeof username !== "string") return false;
  const trimmed = username.trim();
  return /^[a-zA-Z0-9\s]{2,50}$/.test(trimmed);
};

/**
 * Validate candidate ID (assuming alphanumeric format)
 */
export const isValidCandidateID = (candidateID: any): boolean => {
  if (typeof candidateID !== "string") return false;
  return /^[a-zA-Z0-9_-]{1,50}$/.test(candidateID.trim());
};

/**
 * Validate JWT token format
 */
export const isValidJWT = (token: any): boolean => {
  if (typeof token !== "string") return false;
  const parts = token.split(".");
  return parts.length === 3;
};

/**
 * Sanitize string input (remove dangerous characters)
 */
export const sanitizeString = (input: any): string => {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>\"'`]/g, "") // Remove potential HTML/script injection chars
    .substring(0, 255); // Limit length
};

/**
 * Sanitize all string fields in an object
 */
export const sanitizeObject = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) return obj;

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

/**
 * Validate all required fields in a request
 */
export const validateRequiredFields = (
  obj: any,
  requiredFields: string[]
): string[] => {
  const missingFields: string[] = [];
  for (const field of requiredFields) {
    if (!obj[field] || (typeof obj[field] === "string" && obj[field].trim() === "")) {
      missingFields.push(field);
    }
  }
  return missingFields;
};

/**
 * Comprehensive signup validation
 */
export const validateSignupData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidUsername(data.user_name)) {
    errors.push("Invalid username: must be 2-50 alphanumeric characters");
  }

  if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.push("Invalid phone number: must be 10 digits");
  }

  if (!isValidAadharID(data.adharID)) {
    errors.push("Invalid Aadhar ID: must be 12 digits");
  }

  if (!isValidAge(data.age)) {
    errors.push("Invalid age: must be between 18 and 120");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Comprehensive login validation
 */
export const validateLoginData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidAadharID(data.adharID)) {
    errors.push("Invalid Aadhar ID");
  }

  if (!isValidOTP(data.otp)) {
    errors.push("Invalid OTP: must be 6 digits");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Comprehensive vote validation
 */
export const validateVoteData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidAadharID(data.adharID)) {
    errors.push("Invalid Aadhar ID");
  }

  if (!isValidCandidateID(data.candidateID)) {
    errors.push("Invalid Candidate ID");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate facial embedding format
 */
export const validateFacialEmbedding = (embedding: any): boolean => {
  return (
    Array.isArray(embedding) &&
    embedding.length > 0 &&
    embedding.length <= 1024 &&
    embedding.every((val) => typeof val === "number" && val >= -1 && val <= 1)
  );
};

export default {
  isValidAadharID,
  isValidPhoneNumber,
  isValidOTP,
  isValidAge,
  isValidUsername,
  isValidCandidateID,
  isValidJWT,
  sanitizeString,
  sanitizeObject,
  validateRequiredFields,
  validateSignupData,
  validateLoginData,
  validateVoteData,
  validateFacialEmbedding,
};
