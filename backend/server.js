import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import protectedRouter from "./routes/protected.route.js";
import cors from "cors";
// Imported intentionally
import ws from "./ws/ws.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.get("/", async (req, res) => {
  return res.send("<h1>Welcome to Solana Alerts API</h1>");
});

// Routes
app.use("/auth", authRouter);
app.use("/protected", protectedRouter);

// Global error handling middleware
app.use((err, _, res, __) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);

    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
