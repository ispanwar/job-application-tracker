const express = require("express");
const router = express.Router();
const {
  addJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", addJob);
router.get("/", getAllJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
module.exports = router;
