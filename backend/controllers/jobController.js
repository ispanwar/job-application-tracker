const Job = require("../models/Job");
const addJob = async (req, res) => {
  try {
    const { company, role, status, date, notes, emailRemainder } = req.body;
    const newJob = new Job({
      company,
      role,
      status,
      date,
      notes,
      emailRemainder,
    });
    const savedJob = await newJob.save();
    return res.status(201).json(savedJob);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error fetching jobs: ", error.message);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.status(200).json({ message: "Job deleted Successfully" });
  } catch (error) {
    console.log("Error deleting job: ", error.message);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.log("Error in updating: ", error.message);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};

module.exports = { addJob, getAllJobs, deleteJob, updateJob };
