import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/centralizedDBConfig";
// import loginRoutes from "./routes/loginRoutes.js";
// import signupRoutes from "./routes/signupRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT ;

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use("/login", loginRoutes);
// app.use("/signup", signupRoutes);

// Database connection
// mongoose
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} hii`);
});
