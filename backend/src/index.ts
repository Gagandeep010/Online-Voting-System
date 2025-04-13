import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/centralizedDBConfig";
 import loginRoutes from "./routes/LoginRout";
import signupRoutes from "./routes/SignupRout";

dotenv.config();
const app = express();
const PORT = process.env.PORT ;

//Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/login", loginRoutes);
app.use("/api/User", signupRoutes);


// Database connection
// mongoose
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} hii`);
});
