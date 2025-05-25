const mongoose = require("mongoose");
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Connection failed: ", error.message);
    process.exit(1);
  }
};
module.exports = { connectToDb };
