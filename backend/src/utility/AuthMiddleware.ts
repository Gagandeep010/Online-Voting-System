// src/utility/AuthMiddleware.ts

import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware to verify JWT token
 */
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Middleware to validate request body
 */
export const validateRequestBody = (
  requiredFields: string[]
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    next();
  };
};

/**
 * Middleware to rate limit requests (basic implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (
  maxRequests: number = 10,
  windowMs: number = 60000
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIP = req.ip || "unknown";
    const now = Date.now();
    const clientData = requestCounts.get(clientIP);

    if (!clientData || now > clientData.resetTime) {
      requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs });
      next();
    } else {
      clientData.count++;

      if (clientData.count > maxRequests) {
        res.status(429).json({
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
        });
        return;
      }

      next();
    }
  };
};

/**
 * Middleware to add security headers
 */
export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Prevent XSS attacks
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );

  // Remove X-Powered-By header for security
  res.removeHeader("X-Powered-By");

  next();
};

export default {
  verifyJWT,
  validateRequestBody,
  rateLimitMiddleware,
  securityHeaders,
};
