const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Offered", "Interviewed", "Rejected"],
      default: "Applied",
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    emailRemainder: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Job", jobSchema);
