import React from "react";
import Jobcard from "./Jobcard";
import KanbanJobCard from "./KanbanJobCard";
export const Kanban = ({ title, jobs, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 w-full">
      <h3 className="font-bold text-2xl text-center">{title}</h3>
      <div className="flex flex-col space-y-4">
        {jobs.map((job, index) => {
          return (
            <KanbanJobCard
              key={index}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Kanban;
