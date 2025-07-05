import axios from "axios";

const API = axios.create({
  baseURL: "https://job-application-tracker-1-9tqp.onrender.com/api",
});

export const addJob = (jobData) => API.post("/jobs", jobData);
export const fetchJobs = () => API.get("/jobs");
export const updateJob = (id, updatedData) =>
  API.put(`/jobs/${id}`, updatedData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
