import { useEffect, useState } from "react";
import Jobcard from "../components/Jobcard";
import { fetchJobs, updateJob, deleteJob } from "../services/api";
export default function JobPage() {
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
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetchJobs();
        console.log("Api response: ", res.data);
        setJobs(res.data);
      } catch (error) {
        console.error("Error Fetching jobs: ", error);
      }
    };
    getJobs();
  }, []);
  // const sortedJobs = jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  const handleEdit = async (job) => {
    const newCompany = prompt("Enter new company name:", job.company);
    const newRole = prompt("Enter new role:", job.role);
    const newStatus = prompt(
      "Enter new status (Applied, Interviewed, Offered, Rejected):",
      job.status
    );
    const newDate = prompt("Enter new date (YYYY-MM-DD):", job.date);
    const newNotes = prompt("Enter new notes:", job.notes);
    const newEmailReminder = window.confirm(
      "Set email reminder? (OK for Yes, Cancel for No)"
    );

    if (
      newCompany ||
      newRole ||
      newStatus ||
      newDate ||
      newNotes ||
      newEmailReminder !== job.emailRemainder
    ) {
      const updatedJob = {
        ...job,
        company: newCompany || job.company,
        role: newRole || job.role,
        status: newStatus || job.status,
        date: newDate || job.date,
        notes: newNotes || job.notes,
        emailRemainder: newEmailReminder,
      };

      try {
        await updateJob(job._id, updatedJob);
        setJobs((prevJobs) =>
          prevJobs.map((j) => (j._id === job._id ? updatedJob : j))
        );
        alert("Job updated successfully!");
      } catch (error) {
        console.error("Update error:", error);
      }
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job, index) => (
          <Jobcard
            key={index}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
