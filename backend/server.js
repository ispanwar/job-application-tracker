const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectToDb } = require("./config/db");
const jobroutes = require("./routes/jobRoutes");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-application-tracker-jb2f.vercel.app",
  "https://job-application-tracker-vert-delta.vercel.app",
  "https://job-application-tracker-m6r4.vercel.app", // <-- Add this line
];

// Log incoming origins for debugging
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

connectToDb();

app.get("/", (req, res) => {
  res.send("API is live");
});

app.use("/api/jobs", jobroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is active on ${PORT}`);
});
