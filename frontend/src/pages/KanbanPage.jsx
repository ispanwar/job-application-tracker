import React, { useEffect, useState } from "react";
import { Kanban } from "../components/Kanban";
import { fetchJobs, updateJob, deleteJob } from "../services/api";
const KanbanPage = () => {
  // const allJobs = [
  //   {
  //     company: "Microsoft",
  //     role: "UX Designer",
  //     status: "Applied",
  //     date: "2023-10-04",
  //     notes: "Application submitted.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Meta",
  //     role: "Data Scientist",
  //     status: "Interviewed",
  //     date: "2023-10-02",
  //     notes: "Waiting for feedback.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Amazon",
  //     role: "Product Manager",
  //     status: "Offered",
  //     date: "2023-10-03",
  //     notes: "Excited about the offer!",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Google",
  //     role: "Software Engineer",
  //     status: "Rejected",
  //     date: "2023-10-01",
  //     notes: "Had a great interview!",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Netflix",
  //     role: "Frontend Developer",
  //     status: "Applied",
  //     date: "2023-10-05",
  //     notes: "Loved the company culture.",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Tesla",
  //     role: "Backend Developer",
  //     status: "Interviewed",
  //     date: "2023-10-06",
  //     notes: "Challenging coding round.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Apple",
  //     role: "Machine Learning Engineer",
  //     status: "Offered",
  //     date: "2023-10-08",
  //     notes: "Verbal offer received.",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "LinkedIn",
  //     role: "Site Reliability Engineer",
  //     status: "Applied",
  //     date: "2023-10-07",
  //     notes: "Resume shortlisting in progress.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Spotify",
  //     role: "Data Analyst",
  //     status: "Rejected",
  //     date: "2023-10-03",
  //     notes: "Good interview but no offer.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Adobe",
  //     role: "UI/UX Designer",
  //     status: "Applied",
  //     date: "2023-10-09",
  //     notes: "Portfolio submitted.",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Intel",
  //     role: "Embedded Systems Engineer",
  //     status: "Interviewed",
  //     date: "2023-10-10",
  //     notes: "Final round completed.",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Salesforce",
  //     role: "DevOps Engineer",
  //     status: "Offered",
  //     date: "2023-10-11",
  //     notes: "Waiting for written offer.",
  //     emailRemainder: true,
  //   },
  //   {
  //     company: "Twitter",
  //     role: "Security Analyst",
  //     status: "Rejected",
  //     date: "2023-10-02",
  //     notes: "Panel interview was tough.",
  //     emailRemainder: false,
  //   },
  //   {
  //     company: "Zoom",
  //     role: "QA Engineer",
  //     status: "Applied",
  //     date: "2023-10-12",
  //     notes: "Test assignment sent.",
  //     emailRemainder: true,
  //   },
  // ];
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetchJobs();
        setAllJobs(res.data);
      } catch (error) {
        console.error("Error in getting jobs: ", error);
      }
    };
    getJobs();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  const handleEdit = async (job) => {
    const newStatus = prompt(
      "Enter new status (Applied, Interviewed, Offered, Rejected):",
      job.status
    );
    if (
      newStatus &&
      ["Applied", "Interviewed", "Offered", "Rejected"].includes(newStatus)
    ) {
      const updatedJob = {
        ...job,
        status: newStatus,
      };
      try {
        await updateJob(job._id, updatedJob);
        setAllJobs((prevJobs) =>
          prevJobs.map((j) => (j._id === job._id ? updatedJob : j))
        );
        alert("Job status updated!");
      } catch (error) {
        console.error("Update error:", error);
      }
    } else if (newStatus) {
      alert(
        "Invalid status! Please enter one of: Applied, Interviewed, Offered, Rejected"
      );
    }
  };
  const getSortedJobs = (status) => {
    return allJobs
      .filter((job) => job.status === status)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <Kanban
        title="Applied"
        jobs={getSortedJobs("Applied")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Kanban
        title="Interviewed"
        jobs={getSortedJobs("Interviewed")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Kanban
        title="Offered"
        jobs={getSortedJobs("Offered")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Kanban
        title="Rejected"
        jobs={getSortedJobs("Rejected")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default KanbanPage;
