import React, { useState } from "react";
export default function KanbanJobCard({ job, onDelete, onEdit }) {
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
  function bgColor(status) {
    switch (status) {
      case "Applied":
        return "bg-blue-100";
      case "Interviewed":
        return "bg-yellow-100";
      case "Offered":
        return "bg-green-100";
      case "Rejected":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  }
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`flex flex-col space-y-3 border rounded-md shadow-md ${bgColor(
          job.status
        )} p-4  ${borderColor(job.status)} `}
      >
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
        {job.emailRemainder ? (
          <p className="text-sm text-blue-600">📧 Email reminder set</p>
        ) : (
          <p className="text-sm invisible">placeholder</p>
        )}
        {showOptions && (
          <div className="mt-3 flex flex-col gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-600"
            >
              Change Status
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job._id);
              }}
              className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
