const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectToDb } = require("./config/db");
const jobroutes = require("./routes/jobRoutes");
require("dotenv").config();

const app = express();
const allowedOrigins = [
  "*",
  "http://localhost:5173", // React dev server
  "https://job-application-tracker-jb2f.vercel.app", // your deployed frontend URL
  "https://job-application-tracker-vert-delta.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow REST tools or server-to-server requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
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

// using routes
app.use("/api/jobs", jobroutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is active on ${PORT}`);
});
