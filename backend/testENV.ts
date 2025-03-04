import dotenv from "dotenv";
import path from "path";

// Load .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("DB_CONNECTION:", process.env.CENTRALIZED_DB_URI);
