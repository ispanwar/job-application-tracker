import axios from "axios";

// const API = axios.create({
//   baseURL: "https://job-application-tracker-197a.onrender.com/api",
// });
const API = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL,
});

export const addJob = (jobData) => API.post("/jobs", jobData);
export const fetchJobs = () => API.get("/jobs");
export const updateJob = (id, updatedData) =>
  API.put(`/jobs/${id}`, updatedData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
