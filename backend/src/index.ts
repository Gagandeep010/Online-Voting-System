import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/centralizedDBConfig";
import loginRoutes from "./routes/LoginRoutes";
import signupRoutes from "./routes/SignupRout";
import facialRecognitionRoutes from "./routes/FacialRecognitionRoutes";
import votesRoutes from "./routes/VotesRouts";
import helmet from "helmet";
import morgan from "morgan";
import {
  securityHeaders,
  rateLimitMiddleware,
} from "./utility/AuthMiddleware";

// ✅ Prometheus
import client from "prom-client";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Prometheus setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const voteCounter = new client.Counter({
  name: "votes_total",
  help: "Total number of votes cast",
  registers: [register],
});

// ✅ Metrics endpoint
app.get("/metrics", async (_req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// ✅ Security Middleware
app.use(helmet()); // Add security headers
app.use(securityHeaders); // Custom security headers
app.use(morgan("combined")); // Logging

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate limiting middleware
app.use(
  rateLimitMiddleware(
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000")
  ) as express.RequestHandler
);

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/login", loginRoutes);
app.use("/api/User", signupRoutes);
app.use("/api/facial", facialRecognitionRoutes);
app.use("/api/votes", votesRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// API documentation endpoint
app.get("/api/docs", (req, res) => {
  res.status(200).json({
    message: "Online Voting System API v1.0",
    endpoints: {
      authentication: {
        signup: "POST /api/User/signup",
        sendOtp: "POST /api/login/getOtp",
        verifyOtp: "POST /api/login/verifyOtp",
      },
      facial: {
        register: "POST /api/facial/register",
        verify: "POST /api/facial/verify",
        status: "GET /api/facial/status/:adharID",
        reset: "POST /api/facial/reset",
      },
      voting: {
        vote: "POST /api/votes/vote",
        tally: "GET /api/votes/tally",
        status: "GET /api/votes/status/:adharID",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found", path: req.path });
});

// Error handler
const errorHandler: express.ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : (err as Error).message,
  });
};

app.use(errorHandler);

// DB connection
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Metrics: http://localhost:${PORT}/metrics`);
});

