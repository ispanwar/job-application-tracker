import { useState } from "react";
export default function Jobcard({ job, onEdit, onDelete }) {
  function colorStatus(status) {
    switch (status) {
      case "Applied":
        return "bg-blue-200 text-blue-800";
      case "Interviewed":
        return "bg-yellow-200 text-yellow-800";
      case "Offered":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  function borderColor(status) {
    switch (status) {
      case "Applied":
        return "border-1 border-blue-200";
      case "Interviewed":
        return "border-1 border-yellow-200";
      case "Offered":
        return "border-1 border-green-200";
      case "Rejected":
        return "border-1 border-red-200";
      default:
        return "border-1 border-gray-200";
    }
  }
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`flex flex-col space-y-3 border rounded-md shadow-md bg-gray-50 p-4  ${borderColor(
          job.status
        )} `}
      >
        <div
          className={`flex justify-center items-center ${colorStatus(
            job.status
          )} rounded-md p-2`}
        >
          <h3 className="text-sm font-semibold">{job.status}</h3>
        </div>
        <h2 className="font-bold text-lg">{job.company}</h2>
        <p className="text-base font-medium">{job.role}</p>
        <p className="text-sm text-gray-700">
          Applied On:{" "}
          {new Date("2023-10-04").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        {job.notes && (
          <p className="text-sm italic text-gray-700">Notes: {job.notes}</p>
        )}
        {job.emailRemainder && (
          <p className="text-sm text-blue-600">📧 Email reminder set</p>
        )}
        {showOptions && (
          <div className="mt-3 flex space-x-2 sm:flex-row gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling
                onEdit(job);
              }}
              className="px-3 py-1  bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling
                onDelete(job._id);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
