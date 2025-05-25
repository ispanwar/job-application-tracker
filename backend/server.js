const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectToDb } = require("./config/db");
const jobroutes = require("./routes/jobRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
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
